import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(user);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "User deleted" });
}
