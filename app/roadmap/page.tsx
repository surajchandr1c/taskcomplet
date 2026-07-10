"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";

import {
  RoadmapCard,
  Task,
  loadRoadmapCards,
  loadStoredTasks,
  saveStoredTasks,
  loadStoredProfile,
  loadHiddenRoadmapSlugs,
  saveHiddenRoadmapSlugs,
} from "@/app/lib/storage";
import AccessLocked from "@/app/components/AccessLocked";

// Removed demo/default roadmap cards — use persisted user-created cards only.

export default function RoadmapPage(): React.ReactElement {
  const [cards, setCards] = useState<RoadmapCard[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadAll = () => {
      const loadedCards = loadRoadmapCards();
      const storedTasks = loadStoredTasks();
      const hidden = loadHiddenRoadmapSlugs();
      const profile = loadStoredProfile();
      requestAnimationFrame(() => {
        setCards(loadedCards.filter((c) => !(hidden ?? []).includes(c.slug)));
        setTasks(storedTasks);
        setIsLoggedIn(!!profile?.username);
      });
    };

    loadAll();
    window.addEventListener("localstorage-sync", loadAll);
    return () => window.removeEventListener("localstorage-sync", loadAll);
  }, []);

  const addedSlugs = useMemo(() => {
    const slugs = new Set<string>();
    tasks.forEach((task) => {
      if (task.slug) slugs.add(task.slug);
    });
    return slugs;
  }, [tasks]);

  const handleAddTask = useCallback((card: RoadmapCard) => {
    if (addedSlugs.has(card.slug)) {
      return;
    }

    const nextTasks: Task[] = [
      ...tasks,
      {
        id: Date.now(),
        title: card.title,
        completed: false,
        slug: card.slug,
      },
    ];

    setTasks(nextTasks);
    saveStoredTasks(nextTasks);
  }, [tasks, addedSlugs]);

  const handleRemoveTaskFromCard = useCallback((card: RoadmapCard) => {
    const next = tasks.filter((t) => t.slug !== card.slug);
    setTasks(next);
    saveStoredTasks(next);
  }, [tasks]);

  const handleRemoveCard = useCallback((card: RoadmapCard) => {
    // remove from visible cards and persist hidden slug
    const nextCards = cards.filter((c) => c.slug !== card.slug);
    setCards(nextCards);
    const hidden = loadHiddenRoadmapSlugs();
    const nextHidden = Array.from(new Set([...(hidden ?? []), card.slug]));
    saveHiddenRoadmapSlugs(nextHidden);
  }, [cards]);

  if (!isLoggedIn) {
    return <AccessLocked message="Please log in or register your profile to view and track roadmap templates." />;
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto text-white">
      <PageHeader title="Roadmap" className="mb-6" />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.slug} className="bg-zinc-950/40 border border-zinc-800 rounded p-4 hover:scale-[1.01] transition-all hover:border-zinc-700">
              <div className="flex flex-col justify-between h-full min-h-[140px]">
                <div>
                  <Link href={`/roadmap/${c.slug}`} className="text-lg font-semibold text-white hover:text-blue-400">
                    {c.title}
                  </Link>
                  {c.description ? (
                    <p className="text-zinc-400 text-sm mt-3">{c.description}</p>
                  ) : (
                    <ul className="text-zinc-400 text-xs space-y-1.5 mt-3 list-disc pl-4">
                      {c.items?.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-end items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveCard(c)}
                    className="px-3 py-1.5 rounded text-xs font-semibold bg-red-600 text-white"
                  >
                    Remove Card
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTask(c)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold ${
                      addedSlugs.has(c.slug)
                        ? "bg-zinc-800 text-zinc-500 border border-zinc-750 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    }`}
                    disabled={addedSlugs.has(c.slug)}
                  >
                    {addedSlugs.has(c.slug) ? "Added" : "Add to Task"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
