import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { db } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const user = await getOrCreateUser();
    const { id } = await params;
    const body = await req.json();

    const existing = await db.asset.findFirst({
      where: { id, userId: user.id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const allowed = [
      "name", "currentValue", "costBasis", "grade", "gradeCompany",
      "certNumber", "quantity", "notes", "tags", "isWatchlisted",
      "cardSet", "setCode", "cardNumber", "rarity", "imageUrl",
      "acquiredFrom", "acquiredAt", "isSealed",
    ] as const;

    const data: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) data[key] = body[key];
    }
    if (data.currentValue !== undefined) data.currentValue = Number(data.currentValue);
    if (data.costBasis !== undefined) data.costBasis = Number(data.costBasis);
    if (data.quantity !== undefined) data.quantity = Number(data.quantity);
    if (data.acquiredAt !== undefined) data.acquiredAt = new Date(data.acquiredAt as string);

    const asset = await db.asset.update({ where: { id }, data });
    return NextResponse.json({ asset });
  } catch (err) {
    console.error("[assets PATCH]", err);
    return NextResponse.json({ error: "Failed to update asset" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const user = await getOrCreateUser();
    const { id } = await params;

    const existing = await db.asset.findFirst({
      where: { id, userId: user.id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await db.asset.delete({ where: { id } });
    return NextResponse.json({ deleted: true });
  } catch (err) {
    console.error("[assets DELETE]", err);
    return NextResponse.json({ error: "Failed to delete asset" }, { status: 500 });
  }
}
