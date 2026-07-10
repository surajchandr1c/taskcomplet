import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/lib/mongodb";
import UserRecord from "@/app/models/UserRecord";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable inside .env");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = body.username?.trim().toLowerCase();
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and Password are required" }, { status: 400 });
    }

    await dbConnect();

    // Query database for user
    const user = await UserRecord.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: `User "@${username}" does not exist. Please sign up first.` }, { status: 404 });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return NextResponse.json({ error: "Authentication failed. Incorrect password." }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET!, { expiresIn: "30d" });

    // Return token, profile, and all synced data to populate user's dashboard
    return NextResponse.json({
      token,
      user: {
        name: user.name,
        username: user.username,
        about: user.about,
        tasks: user.tasks || [],
        roadmapCards: user.roadmapCards || [],
        roadmapCardTasks: user.roadmapCardTasks || {},
        taskCompletionHistory: user.taskCompletionHistory || {}
      }
    });
  } catch (error: unknown) {
    console.error("Login API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Authentication failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
