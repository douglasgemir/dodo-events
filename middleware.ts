import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protect only the app routes under /protected and make / redirect to /login
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/login")
  ) {
    return NextResponse.next();
  }

  // Redirect root to /login
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Protect /protected routes
  if (pathname.startsWith("/protected")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    // Validate token by calling the server route /api/auth/me
    try {
      const res = await fetch(new URL("/api/auth/me", req.url).toString(), {
        method: "GET",
        headers: { cookie: `token=${token}` },
      });

      if (res.ok) return NextResponse.next();
    } catch (e) {
      // fall through to redirect
    }

    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/"],
};
