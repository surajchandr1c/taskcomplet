"use client";

import Link from "next/link";
import AccessLocked from "@/app/components/AccessLocked";
import React, { useEffect, useState } from "react";
import ViewButton from "@/app/components/ViewButton";
import PageHeader from "@/app/components/PageHeader";

import {
  Task,
  loadStoredTasks,
  saveStoredTasks,
  loadCardTasks,
  loadStoredProfile,
} from "@/app/lib/storage";

function getCardTaskCounts(slug?: string) {
  if (!slug) {
    return { completed: 0, total: 0 };
  }

  const cards = loadCardTasks();
  const cardData = cards[slug];
  if (!cardData) {
    return { completed: 0, total: 0 };
  }

  const unsectionedTasks = cardData.tasks ?? [];
  const sectionTasks = cardData.sections?.flatMap((s) => s.tasks) ?? [];
  const allTasks = [...unsectionedTasks, ...sectionTasks];

  return {
    completed: allTasks.filter((task) => task.completed).length,
    total: allTasks.length,
  };
}

export default function TasksPage(): React.ReactElement {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadAll = () => {
      const storedTasks = loadStoredTasks();
      const profile = loadStoredProfile();
      requestAnimationFrame(() => {
        setTasks(storedTasks);
        setIsLoggedIn(!!profile?.username);
      });
    };

    loadAll();
    window.addEventListener("localstorage-sync", loadAll);
    return () => window.removeEventListener("localstorage-sync", loadAll);
  }, []);

  const handleRemove = (taskId: number) => {
    const nextTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(nextTasks);
    saveStoredTasks(nextTasks);
  };

  if (!isLoggedIn) {
    return <AccessLocked message="Please log in or register your profile to view and manage your task lists." />;
  }

  return (
    <div className="p-8">
      <PageHeader title="Task List" className="mb-4" />
      <ul className="space-y-2 max-w-xl">
        {tasks.length === 0 ? (
          <li className="border border-zinc-800 p-4 rounded text-zinc-400 bg-zinc-950/30">No tasks are available yet.</li>
        ) : (
          tasks.map((t) => {
            const cardCounts = getCardTaskCounts(t.slug);
            return (
              <li key={t.id} className="space-y-3 border border-zinc-850 rounded bg-zinc-950 p-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-white">{t.title}</div>
                    <div className="text-sm text-zinc-500">{t.completed ? "Completed" : "Pending"}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{cardCounts.completed} / {cardCounts.total}</div>
                </div>
                <div className="flex items-center gap-2">
                  <ViewButton href={t.slug ? `/roadmap/${t.slug}` : undefined} disabled={!t.slug} />
                  <button
                    type="button"
                    onClick={() => handleRemove(t.id)}
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
