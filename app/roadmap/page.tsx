"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";

import Card from "@/app/components/ui/Card";
import Input from "@/app/components/ui/Input";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import { useDebounce } from "@/app/hooks/useDebounce";

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

import { defaultOtherRoadmapCards } from "@/app/lib/defaultOtherRoadmaps";

const predefinedSlugs = new Set([
  "frontend",
  "backend",
  "machin-learning",
  ...defaultOtherRoadmapCards.map((c) => c.slug)
]);

export default function RoadmapPage(): React.ReactElement {
  const [cards, setCards] = useState<RoadmapCard[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 150);

  useEffect(() => {
    const loadAll = () => {
      const loadedCards = loadRoadmapCards();
      const storedTasks = loadStoredTasks();
      const hidden = loadHiddenRoadmapSlugs().filter(s => !predefinedSlugs.has(s));
      const profile = loadStoredProfile();
      requestAnimationFrame(() => {
        setCards(loadedCards.filter((c) => predefinedSlugs.has(c.slug) && !(hidden ?? []).includes(c.slug)));
        setTasks(storedTasks);
        setIsLoggedIn(!!profile?.username);
      });
    };

    loadAll();
    window.addEventListener("localstorage-sync", loadAll);
    return () => window.removeEventListener("localstorage-sync", loadAll);
  }, []);

  const addedCardSlugs = useMemo(() => {
    const slugs = new Set<string>();
    tasks.forEach((task) => {
      const matchingCard = cards.find((c) => c.slug === task.slug);
      if (matchingCard && task.title === matchingCard.title && task.slug) {
        slugs.add(task.slug);
      }
    });
    return slugs;
  }, [tasks, cards]);

  const handleAddTask = useCallback((card: RoadmapCard) => {
    if (addedCardSlugs.has(card.slug)) {
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
  }, [tasks, addedCardSlugs]);



  const filteredCards = cards.filter((c) => {
    const query = debouncedSearchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      c.title.toLowerCase().includes(query) ||
      c.description?.toLowerCase().includes(query) ||
      c.items?.some((item) => item.toLowerCase().includes(query))
    );
  });

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto text-white">
        <PageHeader title="Roadmap" className="mb-6" />

        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roadmaps..."
          />
        </div>

        {/* Login Banner for non-logged-in users */}
        {!isLoggedIn && (
          <div className="mb-6 p-4 bg-blue-600/10 border border-blue-500/30 rounded-xl flex items-center gap-3 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <p className="text-sm text-zinc-300">
              <Link href="/profile" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">Log in or sign up</Link>
              {" "}to access roadmap details and track your progress.
            </p>
          </div>
        )}

        {filteredCards.length === 0 ? (
          <Card className="text-zinc-500 text-sm border-dashed p-8 text-center bg-zinc-950/20">
            No roadmaps match your search query.
          </Card>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCards.map((c) => {
              const isCustom = !predefinedSlugs.has(c.slug);
              const roadmapTasks = tasks.filter((t) => t.slug === c.slug);
              const cardHref = isLoggedIn ? `/roadmap/${c.slug}` : "/profile";

              return (
                <Card key={c.slug} hoverable className={`relative flex flex-col justify-between min-h-[140px] ${!isLoggedIn ? "opacity-80" : ""}`}>
                  {isCustom && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 animate-fade-in" title="Custom Roadmap">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 absolute" />
                      <Badge variant="success" className="pl-1.5">Custom</Badge>
                    </div>
                  )}
                  {/* Lock icon for non-logged-in users */}
                  {!isLoggedIn && (
                    <div className="absolute top-3 right-3" title="Login required to access">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-zinc-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col justify-between h-full min-h-[140px]">
                    <div>
                      <Link href={cardHref} className="text-lg font-semibold text-white hover:text-blue-400">
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
                    <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-xs">
                      <span className="text-zinc-500">
                        {roadmapTasks.length} {roadmapTasks.length === 1 ? "task" : "tasks"} active
                      </span>
                      {isLoggedIn ? (
                        <Button
                          variant={addedCardSlugs.has(c.slug) ? "secondary" : "primary"}
                          size="sm"
                          onClick={() => handleAddTask(c)}
                          disabled={addedCardSlugs.has(c.slug)}
                        >
                          {addedCardSlugs.has(c.slug) ? "Added" : "Add to Task"}
                        </Button>
                      ) : (
                        <Link href="/profile">
                          <Button variant="ghost" size="sm">
                            Login to Add
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
