import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const rules = await prisma.checkinRule.findMany({
    where: {
      eventId: Number(id),
    },
  });

  return NextResponse.json(rules);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const rule = await prisma.checkinRule.update({
    where: { id: Number(id) },
    data: body,
  });

  return NextResponse.json(rule);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.checkinRule.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Rule deleted" });
}
