import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import UserRecord from "@/app/models/UserRecord";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all users sorted by newest signup first
    const users = await UserRecord.find({})
      .sort({ createdAt: -1 })
      .select("name username about tasks roadmapCards createdAt");

    // Format fields to avoid sending unnecessary array details down the wire
    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      username: user.username,
      about: user.about,
      tasksCount: user.tasks?.length || 0,
      roadmapsCount: user.roadmapCards?.length || 0,
      createdAt: user.createdAt,
    }));

    return NextResponse.json(formattedUsers);
  } catch (error: unknown) {
    console.error("GET admin users error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch user list";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username")?.trim().toLowerCase();

    if (!username) {
      return NextResponse.json({ error: "Username is required to delete a user." }, { status: 400 });
    }

    await dbConnect();

    const result = await UserRecord.deleteOne({ username });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("DELETE admin user error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete user";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
