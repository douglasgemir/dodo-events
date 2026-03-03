import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const checkin = await prisma.checkin.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: true,
      event: true,
      checkinRule: true,
    },
  });

  return NextResponse.json(checkin);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  await prisma.checkin.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Checkin deleted" });
}
