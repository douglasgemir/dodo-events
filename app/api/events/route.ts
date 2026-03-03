import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.event.findMany({
    include: { checkinRules: true },
  });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const body = await req.json();

  const event = await prisma.event.create({
    data: {
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    },
  });

  return NextResponse.json(event, { status: 201 });
}
