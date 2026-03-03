import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const rule = await prisma.checkinRule.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(rule);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();

  const rule = await prisma.checkinRule.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(rule);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  await prisma.checkinRule.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Rule deleted" });
}
