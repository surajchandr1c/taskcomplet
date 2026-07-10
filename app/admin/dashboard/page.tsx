"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";

interface Signup {
  name: string;
  username: string;
  about: string;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalTasks: number;
  totalRoadmaps: number;
  recentSignups: Signup[];
}

export default function AdminDashboardPage(): React.ReactElement {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) {
        throw new Error("Failed to retrieve admin dashboard stats.");
      }
      const data = await res.json();
      setStats(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-zinc-900 rounded" />
        
        {/* Metric Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-zinc-950 border border-zinc-900 rounded-xl" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="border border-zinc-900 bg-zinc-950 rounded-xl h-96" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-red-950/20 border border-red-800/50 text-red-400">
        <h3 className="font-bold text-lg mb-2">Error Loading Dashboard</h3>
        <p className="text-sm">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError("");
            fetchStats();
          }}
          className="mt-4 px-4 py-2 bg-red-800 text-white rounded text-sm hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const metricCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      colorClass: "text-blue-400",
      bgClass: "bg-blue-600/10 border-blue-500/15",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
    {
      label: "Tasks Tracked",
      value: stats?.totalTasks ?? 0,
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-600/10 border-emerald-500/15",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
    {
      label: "Custom Roadmaps",
      value: stats?.totalRoadmaps ?? 0,
      colorClass: "text-purple-400",
      bgClass: "bg-purple-600/10 border-purple-500/15",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h10a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l2 2 4-4M7.5 12h.008v.008H7.5V12Zm0 3h.008v.008H7.5V15Zm0 3h.008v.008H7.5V18Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <PageHeader title="Admin Dashboard" className="mb-2" />
        <p className="text-zinc-500 text-xs sm:text-sm">Overall stats and registration activity across TaskComplet.</p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid gap-6 sm:grid-cols-3">
        {metricCards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-xl border bg-zinc-950/40 p-6 flex items-center justify-between hover:scale-[1.01] transition-transform duration-200 ${card.bgClass}`}
          >
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">{card.label}</div>
              <div className="text-3xl font-extrabold text-white mt-3">{card.value}</div>
            </div>
            <div className={`p-3 rounded-lg bg-zinc-900 ${card.colorClass}`}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Recent Signups</h2>
            <p className="text-zinc-500 text-xs mt-0.5">The last 5 users who created profiles.</p>
          </div>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Manage Users
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {stats?.recentSignups && stats.recentSignups.length > 0 ? (
          <div className="divide-y divide-zinc-900">
            {stats.recentSignups.map((user, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{user.name}</span>
                    <span className="text-xs text-zinc-500">@{user.username}</span>
                  </div>
                  <p className="text-zinc-400 text-xs mt-1 truncate max-w-lg">
                    {user.about || "No biography provided."}
                  </p>
                </div>
                <div className="text-[10px] text-zinc-500 shrink-0 uppercase tracking-wider font-semibold self-start sm:self-center">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-zinc-500 text-sm py-8 text-center border border-dashed border-zinc-900 rounded-lg bg-zinc-950/20">
            No users signed up yet.
          </div>
        )}
      </div>
    </div>
  );
}
