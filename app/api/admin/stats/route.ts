import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import UserRecord from "@/app/models/UserRecord";

export async function GET() {
  try {
    await dbConnect();

    const totalUsers = await UserRecord.countDocuments({});

    // Aggregate total tasks and roadmaps across all users in a single query
    const aggregationResult = await UserRecord.aggregate([
      {
        $project: {
          tasksCount: { $cond: { if: { $isArray: "$tasks" }, then: { $size: "$tasks" }, else: 0 } },
          roadmapCount: { $cond: { if: { $isArray: "$roadmapCards" }, then: { $size: "$roadmapCards" }, else: 0 } },
        },
      },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: "$tasksCount" },
          totalRoadmaps: { $sum: "$roadmapCount" },
        },
      },
    ]);

    const totalTasks = aggregationResult[0]?.totalTasks || 0;
    const totalRoadmaps = aggregationResult[0]?.totalRoadmaps || 0;

    // Fetch the 5 most recent signups (sorted by creation date descending)
    const recentSignups = await UserRecord.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name username about createdAt");

    return NextResponse.json({
      totalUsers,
      totalTasks,
      totalRoadmaps,
      recentSignups,
    });
  } catch (error: unknown) {
    console.error("Stats API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch dashboard stats";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
