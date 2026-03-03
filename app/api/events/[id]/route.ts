import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: Number(params.id) },
    include: { checkinRules: true },
  });

  return NextResponse.json(event);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();

  const event = await prisma.event.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(event);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  await prisma.event.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Event deleted" });
}
