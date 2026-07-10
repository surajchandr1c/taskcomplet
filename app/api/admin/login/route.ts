import { NextResponse } from "next/server";
import { signSession } from "@/app/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = body.email?.trim();
    const password = body.password;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET || "fallback_secret";

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials are not configured in the system environment variables." },
        { status: 500 }
      );
    }

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid admin email or password." }, { status: 401 });
    }

    // Session valid for 1 day
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    const token = await signSession({ email, expires }, jwtSecret);

    const response = NextResponse.json({ success: true });

    // Set secure HttpOnly cookie
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(expires),
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Admin login route error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to authenticate";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
