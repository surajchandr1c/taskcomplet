"use client";

import Link from "next/link";
import AccessLocked from "@/app/components/AccessLocked";
import PageHeader from "@/app/components/PageHeader";
import React, { useState, useEffect } from "react";

import {
  RoadmapCard,
  Task,
  loadRoadmapCards,
  saveRoadmapCards,
  loadStoredTasks,
  saveStoredTasks,
  loadStoredProfile,
} from "@/app/lib/storage";

// Removed demo slug list — no reserved demo slugs.

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function AddPage(): React.ReactElement {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const profile = loadStoredProfile();
      setIsLoggedIn(!!profile?.username);
    };
    checkLogin();
    window.addEventListener("localstorage-sync", checkLogin);
    return () => window.removeEventListener("localstorage-sync", checkLogin);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter both a roadmap name and a description.");
      return;
    }

    const slug = createSlug(title);
    if (!slug) {
      alert("Please enter a unique roadmap name.");
      return;
    }

    const existingCards = loadRoadmapCards();
    const duplicate = existingCards.some((card) => card.slug === slug);
    if (duplicate) {
      alert("A roadmap card with this name already exists.");
      return;
    }

    const newCard: RoadmapCard = {
      title: title.trim(),
      slug,
      description: description.trim(),
    };

    saveRoadmapCards([...existingCards, newCard]);

    const storedTasks = loadStoredTasks();
    const nextTask: Task = {
      id: Date.now(),
      title: newCard.title,
      completed: false,
      slug: newCard.slug,
    };
    saveStoredTasks([...storedTasks, nextTask]);

    alert("Roadmap card created and task added.");
    setTitle("");
    setDescription("");
  };

  if (!isLoggedIn) {
    return <AccessLocked message="Please log in or register your profile to create new roadmaps and tasks." />;
  }

  return (
    <div className="p-8">
      <PageHeader title="Create a New Roadmap" className="mb-4" />
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Card Name</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-zinc-800 px-3 py-2 rounded bg-zinc-950 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter roadmap card name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-zinc-800 px-3 py-2 rounded bg-zinc-950 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter card description"
            rows={4}
          />
        </div>

        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm font-semibold transition-colors shadow-md">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
