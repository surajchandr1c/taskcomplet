import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/mongodb";
import UserRecord from "@/app/models/UserRecord";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable inside .env");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const checkUsername = searchParams.get("username")?.trim().toLowerCase();

    await dbConnect();

    // 1. PUBLIC USERNAME UNIQUENESS CHECK
    if (checkUsername) {
      const record = await UserRecord.findOne({ username: checkUsername });
      return NextResponse.json({ exists: !!record });
    }

    // 2. SECURE AUTHENTICATED FETCH
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized. Missing token." }, { status: 401 });
    }

    const token = authHeader.substring(7);
    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Unauthorized. Invalid token." }, { status: 401 });
    }

    if (typeof decoded === "string" || !decoded.username) {
      return NextResponse.json({ error: "Unauthorized. Invalid token payload." }, { status: 401 });
    }

    const username = decoded.username as string;
    const record = await UserRecord.findOne({ username });

    if (!record) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error: unknown) {
    console.error("GET user-data error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch user data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // SECURE AUTHENTICATED UPSERT
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized. Missing token." }, { status: 401 });
    }

    const token = authHeader.substring(7);
    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Unauthorized. Invalid token." }, { status: 401 });
    }

    if (typeof decoded === "string" || !decoded.username) {
      return NextResponse.json({ error: "Unauthorized. Invalid token payload." }, { status: 401 });
    }

    const username = decoded.username as string;
    const body = await request.json();

    await dbConnect();

    const updated = await UserRecord.findOneAndUpdate(
      { username },
      {
        $set: {
          name: body.name,
          about: body.about,
          tasks: body.tasks || [],
          roadmapCards: body.roadmapCards || [],
          roadmapCardTasks: body.roadmapCardTasks || {},
          taskCompletionHistory: body.taskCompletionHistory || {}
        }
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("POST user-data error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save user data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
