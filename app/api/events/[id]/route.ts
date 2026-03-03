import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id: Number(id) },
    include: { checkinRules: true },
  });

  return NextResponse.json(event);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const event = await prisma.event.update({
    where: { id: Number(id) },
    data: body,
  });

  return NextResponse.json(event);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const eventId = Number(id);

    // Prisma transactional delete to ensure children are removed first
    await prisma.$transaction([
      prisma.checkin.deleteMany({ where: { eventId } }),
      prisma.checkinRule.deleteMany({ where: { eventId } }),
      prisma.event.delete({ where: { id: eventId } })
    ]);

    return NextResponse.json({ message: "Event deleted" });
  } catch (error: any) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
