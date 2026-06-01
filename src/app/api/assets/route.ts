import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await getOrCreateUser();
    const assets = await db.asset.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      assets.map(a => ({
        id: a.id,
        name: a.name,
        set: a.cardSet ?? "",
        setCode: a.setCode ?? "",
        number: a.cardNumber ?? "",
        rarity: a.rarity ?? "",
        grade: a.grade ?? "RAW",
        quantity: a.quantity,
        costBasis: Number(a.costBasis),
        currentValue: Number(a.currentValue),
        imageUrl: a.imageUrl ?? null,
        category: a.category,
        tags: a.tags,
        acquiredAt: a.acquiredAt.toISOString(),
        acquiredFrom: a.acquiredFrom,
        notes: a.notes ?? null,
        isWatchlisted: a.isWatchlisted,
        isSealed: a.isSealed,
        createdAt: a.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    console.error("[assets GET]", err);
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getOrCreateUser();
    const body = await req.json();

    if (!body.name || body.costBasis == null || body.currentValue == null || !body.acquiredFrom || !body.acquiredAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const asset = await db.asset.create({
      data: {
        userId: user.id,
        name: body.name,
        category: body.category ?? "POKEMON_TCG",
        cardSet: body.cardSet || null,
        setCode: body.setCode || null,
        cardNumber: body.cardNumber || null,
        rarity: body.rarity || null,
        grade: body.grade || null,
        gradeCompany: body.gradeCompany || null,
        certNumber: body.certNumber || null,
        language: body.language || "English",
        isSealed: body.isSealed ?? false,
        quantity: Number(body.quantity) || 1,
        costBasis: Number(body.costBasis),
        currentValue: Number(body.currentValue),
        acquiredFrom: body.acquiredFrom,
        acquiredAt: new Date(body.acquiredAt),
        notes: body.notes || null,
        tags: body.tags ?? [],
        imageUrl: body.imageUrl || null,
        collectionId: body.collectionId || null,
      },
    });

    return NextResponse.json({ asset });
  } catch (err) {
    console.error("[assets POST]", err);
    return NextResponse.json({ error: "Failed to create asset" }, { status: 500 });
  }
}
