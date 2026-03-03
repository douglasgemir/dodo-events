import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const checkin = await prisma.checkin.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
      event: true,
      checkinRule: true,
    },
  });

  return NextResponse.json(checkin);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const checkin = await prisma.checkin.update({
    where: { id: Number(id) },
    data: body,
  });

  return NextResponse.json(checkin);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.checkin.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Checkin deleted" });
}
