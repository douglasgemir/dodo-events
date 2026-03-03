import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const rule = await prisma.checkinRule.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(rule);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  // Only pass updatable fields — Prisma rejects unknown keys
  const { type, isActive, startOffset, endOffset, mandatory } = body;

  try {
    const rule = await prisma.checkinRule.update({
      where: { id: Number(id) },
      data: { type, isActive, startOffset, endOffset, mandatory } as any,
    });
    return NextResponse.json(rule);
  } catch (error: any) {
    console.error("Error updating checkin rule:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await prisma.checkin.deleteMany({
    where: { checkinRuleId: Number(id) },
  });

  await prisma.checkinRule.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Rule deleted" });
}
