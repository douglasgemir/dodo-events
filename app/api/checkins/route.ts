import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const checkins = await prisma.checkin.findMany({
    include: {
      user: true,
      event: true,
      checkinRule: true,
    },
  });

  return NextResponse.json(checkins);
}

export async function POST(req: Request) {
  const body = await req.json();

  const checkin = await prisma.checkin.create({
    data: body,
  });

  return NextResponse.json(checkin, { status: 201 });
}
