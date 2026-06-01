import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { db } from "@/lib/db";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PokéCard {
  id: string;
  name: string;
  number: string;
  rarity?: string;
  images: { small: string; large: string };
  set: { id: string; name: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUBTYPES_MATCH: [RegExp, string][] = [
  [/\bvstar\b/i, "vstar"], [/\bvmax\b/i, "vmax"],
  [/\bv\b/i, "v"],         [/\bgx\b/i, "gx"],
  [/\bmega\b/i, "mega"],   [/\bradiant\b/i, "radiant"],
  [/\btag\s*team\b/i, "tag team"], [/\bex\b/i, "ex"],
];

function buildMatchQuery(raw: string): string {
  let text = raw
    .replace(/\b(PSA|BGS|SGC|CGC|CSG|ACE)\s*\d+(\.\d+)?\b/gi, "")
    .replace(/\b\d+\/\d+\b/g, "")
    .replace(/\b(RAW|Full Art|Alt Art|Special Art|Illustration Rare|Special Illustration Rare|Hyper Rare|Rainbow Rare|Secret Rare|Holo|Reverse Holo|SAR|SIR|SR|HR|UR|IR)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const parts: string[] = [];

  for (const [pattern, subtype] of SUBTYPES_MATCH) {
    if (pattern.test(text)) {
      parts.push(`subtypes:"${subtype}"`);
      text = text.replace(pattern, "").replace(/\s+/g, " ").trim();
    }
  }

  if (text.length >= 2) parts.push(`name:*${text}*`);
  return parts.length > 0 ? parts.join(" ") : `name:*${text}*`;
}

async function searchPokemonCard(rawTitle: string): Promise<PokéCard | null> {
  const q = buildMatchQuery(rawTitle);
  if (!q || q.length < 5) return null;
  const apiKey = process.env.POKEMON_TCG_API_KEY;
  const reqHeaders: HeadersInit = apiKey ? { "X-Api-Key": apiKey } : {};
  try {
    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(q)}&pageSize=1&orderBy=-set.releaseDate&select=id,name,number,rarity,images,set`,
      { headers: reqHeaders, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.data?.[0] as PokéCard) ?? null;
  } catch {
    return null;
  }
}

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── POST /api/cards/match ────────────────────────────────────────────────────
// Finds all unmatched SELL transactions, searches PokéTCG API for each unique
// card name, and stores the image URL + card ID on the transaction row.

export async function POST() {
  try {
    const user = await getOrCreateUser();

    // Fetch all unmatched sell transactions
    const unmatched = await db.transaction.findMany({
      where: {
        userId: user.id,
        type: "SELL",
        pokemonCardId: null,
        title: { not: null },
      },
      select: { id: true, title: true },
    });

    if (unmatched.length === 0) {
      return NextResponse.json({ matched: 0, total: 0, alreadyDone: true });
    }

    // Group transaction IDs by normalized search query to avoid duplicate API calls
    const groups = new Map<string, string[]>();
    for (const tx of unmatched) {
      const name = buildMatchQuery(tx.title ?? "");
      if (name.length < 3) continue;
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name)!.push(tx.id);
    }

    let matched = 0;
    const entries = [...groups.entries()];

    // Process in batches of 5 concurrent requests to stay under rate limits
    for (let i = 0; i < entries.length; i += 5) {
      const batch = entries.slice(i, i + 5);

      await Promise.allSettled(
        batch.map(async ([searchName, txIds]) => {
          const card = await searchPokemonCard(searchName);
          if (!card) return;

          await db.transaction.updateMany({
            where: { id: { in: txIds } },
            data: {
              imageUrl: card.images.small,
              pokemonCardId: card.id,
            },
          });

          matched += txIds.length;
        })
      );

      // Pause between batches to avoid hammering the API
      if (i + 5 < entries.length) await delay(250);
    }

    return NextResponse.json({
      matched,
      total: unmatched.length,
      unmatched: unmatched.length - matched,
    });
  } catch (err) {
    console.error("[cards/match]", err);
    return NextResponse.json({ error: "Match failed" }, { status: 500 });
  }
}
