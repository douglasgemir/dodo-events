import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: body,
  });

  return NextResponse.json(user);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.user.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "User deleted" });
}
