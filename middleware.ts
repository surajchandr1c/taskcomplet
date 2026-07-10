import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/app/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
  const session = request.cookies.get("admin_session")?.value;

  const isValid = session ? await verifySession(session, jwtSecret) : null;

  // 1. Handle access to the login page itself
  if (pathname === "/admin/login") {
    if (isValid) {
      // If already logged in, redirect to dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect all other admin page and api routes
  if (!isValid) {
    // For protected API endpoints, return a JSON error
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized admin access." }, { status: 401 });
    }
    // For protected page routes, redirect to login
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/stats",
    "/api/admin/users",
  ],
};
