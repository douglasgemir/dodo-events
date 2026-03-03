import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const rules = await prisma.checkinRule.findMany({
    include: { event: true },
  });

  return NextResponse.json(rules);
}

export async function POST(req: Request) {
  const body = await req.json();

  const rule = await prisma.checkinRule.create({
    data: body,
  });

  return NextResponse.json(rule, { status: 201 });
}
