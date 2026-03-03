import { NextResponse } from "next/server";

export async function POST(_: Request) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
