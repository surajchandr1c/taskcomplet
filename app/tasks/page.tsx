"use client";

import React, { useEffect, useState } from "react";
import AccessLocked from "@/app/components/AccessLocked";
import ViewButton from "@/app/components/ViewButton";
import PageHeader from "@/app/components/PageHeader";
import TasksSkeleton from "@/app/components/skeletons/TasksSkeleton";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = () => {
      const storedTasks = loadStoredTasks();
      const profile = loadStoredProfile();
      requestAnimationFrame(() => {
        setTasks(storedTasks);
        setIsLoggedIn(!!profile?.username);
        setLoading(false);
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

  if (loading) {
    return (
      <div className="p-8">
        <TasksSkeleton />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AccessLocked message="Please log in or register your profile to view and manage your task lists." />;
  }

  return (
    <div className="p-8">
      <PageHeader title="Task List" className="mb-4" />
      <ul className="space-y-2 max-w-xl">
        {tasks.length === 0 ? (
          <Card className="p-4 text-zinc-400 bg-zinc-950/30">No tasks are available yet.</Card>
        ) : (
          tasks.map((t) => {
            const cardCounts = getCardTaskCounts(t.slug);
            return (
              <li key={t.id}>
                <Card className="space-y-3 p-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-white">{t.title}</div>
                      <div className="text-sm text-zinc-500">{t.completed ? "Completed" : "Pending"}</div>
                    </div>
                    <div className="text-sm text-zinc-400">{cardCounts.completed} / {cardCounts.total}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ViewButton href={t.slug ? `/roadmap/${t.slug}` : undefined} disabled={!t.slug} />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(t.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
