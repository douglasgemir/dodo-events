import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const rules = await prisma.checkinRule.findMany({
    where: {
      eventId: Number(id),
    },
  });

  return NextResponse.json(rules);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const rule = await prisma.checkinRule.create({
      data: {
        type: body.type,
        startOffset: Number(body.startOffset) || 0,
        endOffset: Number(body.endOffset) || 0,
        mandatory: body.mandatory ?? false,
        eventId: Number(id),
      },
    });

    return NextResponse.json(rule, { status: 201 });
  } catch (error: any) {
    console.error("Error creating checkin rule:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const rule = await prisma.checkinRule.update({
    where: { id: Number(id) },
    data: {
      type: body.type,
      startOffset: Number(body.startOffset) || 0,
      endOffset: Number(body.endOffset) || 0,
      mandatory: body.mandatory ?? false,
    },
  });

  return NextResponse.json(rule);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.checkinRule.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Rule deleted" });
}
