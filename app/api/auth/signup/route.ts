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
    const name = body.name?.trim();
    const username = body.username?.trim().toLowerCase();
    const password = body.password;
    const about = body.about?.trim() || "";

    if (!name || !username || !password) {
      return NextResponse.json({ error: "Name, Username, and Password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    const usernameRegex = /^[a-z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json({ error: "Username can only contain letters, numbers, underscores, or hyphens (no spaces)." }, { status: 400 });
    }

    await dbConnect();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user record
    const newUser = await UserRecord.create({
      username,
      password: hashedPassword,
      name,
      about,
      tasks: [],
      roadmapCards: [],
      roadmapCardTasks: {}
    }).catch((error: unknown) => {
      const mongoError = error as { code?: number };
      if (mongoError?.code === 11000) {
        return null;
      }
      throw error;
    });

    if (!newUser) {
      return NextResponse.json({ error: "Username is already taken. Please choose a unique one." }, { status: 409 });
    }

    // Generate JWT token
    const token = jwt.sign({ username: newUser.username }, JWT_SECRET!, { expiresIn: "30d" });

    return NextResponse.json({
      token,
      user: {
        name: newUser.name,
        username: newUser.username,
        about: newUser.about,
        taskCompletionHistory: newUser.taskCompletionHistory || {}
      }
    });
  } catch (error: unknown) {
    console.error("Signup API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
