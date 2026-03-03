import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function parseTokenFromHeader(req: Request) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.match(/(?:^|; )token=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET(req: Request) {
  const token = parseTokenFromHeader(req);
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const payload = verifyJwt<{ sub: number; email: string }>(token);
  if (!payload) return NextResponse.json({ user: null }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ id: user.id, email: user.email, name: user.name });
}
