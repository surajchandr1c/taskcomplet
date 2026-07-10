"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Calendar from "./components/Calendar";
import { Task, loadStoredTasks, loadStoredProfile } from "@/app/lib/storage";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profileName, setProfileName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadAll = () => {
      const profileData = loadStoredProfile();
      requestAnimationFrame(() => {
        if (profileData?.username) {
          setTasks(loadStoredTasks());
          setProfileName(profileData.name);
          setIsLoggedIn(true);
        } else {
          setTasks([]);
          setProfileName("");
          setIsLoggedIn(false);
        }
      });
    };

    loadAll();
    window.addEventListener("localstorage-sync", loadAll);
    return () => window.removeEventListener("localstorage-sync", loadAll);
  }, []);

  const total = isLoggedIn ? tasks.length : 0;
  const completed = isLoggedIn ? tasks.filter((task) => task.completed).length : 0;
  const pending = total - completed;

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center py-12 px-6 bg-white dark:bg-black">
        <div className="w-full max-w-6xl">
          <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Dashboard
                </div>
                <h1 className="mt-2 text-3xl font-semibold text-white">
                  {isLoggedIn ? `Welcome, ${profileName}` : "Sign in to see your dashboard"}
                </h1>
                <p className="mt-2 text-sm text-zinc-400">
                  {isLoggedIn
                    ? "Manage your tasks, calendar progress, and roadmap activity in one place."
                    : "Your calendar, task totals, and daily progress will appear after login."}
                </p>
              </div>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-lg border border-blue-500/30 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                {isLoggedIn ? "Switch Account" : "Go to Login / Sign Up"}
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(320px,0.8fr)]">
            <div className="min-w-0">
              <Calendar isEnabled={isLoggedIn} />
            </div>

            <aside className="space-y-4 lg:pt-1">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <MetricCard label="Total Tasks" value={isLoggedIn ? total : null} />
                <MetricCard label="Pending" value={isLoggedIn ? pending : null} />
                <MetricCard label="Completed" value={isLoggedIn ? completed : null} />
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-white">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-medium">Tasks</h2>
                  {!isLoggedIn && <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">No user selected</span>}
                </div>

                {isLoggedIn ? (
                  tasks.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      {tasks.map((task) => (
                        task.slug ? (
                          <Link
                            key={task.id}
                            href={`/roadmap/${task.slug}`}
                            className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 transition-colors hover:border-zinc-600 hover:bg-zinc-900"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-white">{task.title}</div>
                              <div className="text-xs text-zinc-500">{task.completed ? "Completed" : "Pending"}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={`text-xs font-semibold ${task.completed ? "text-emerald-300" : "text-amber-300"}`}>
                                {task.completed ? "Done" : "Open"}
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4 text-zinc-500"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        ) : (
                          <div key={task.id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                            <div>
                              <div className="text-sm font-medium text-white">{task.title}</div>
                              <div className="text-xs text-zinc-500">{task.completed ? "Completed" : "Pending"}</div>
                            </div>
                            <div className={`text-xs font-semibold ${task.completed ? "text-emerald-300" : "text-amber-300"}`}>
                              {task.completed ? "Done" : "Open"}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 p-4 text-sm text-zinc-400">
                      No tasks found for this account yet.
                    </div>
                  )
                ) : (
                  <div className="mt-4 rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 p-4 text-sm text-zinc-400">
                    Log in to load your tasks.
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-white">
      <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">{label}</div>
      <div className="mt-3 text-3xl font-semibold">{value === null ? "-" : value}</div>
    </div>
  );
}
