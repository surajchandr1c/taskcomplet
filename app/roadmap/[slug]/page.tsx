"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import AccessLocked from "@/app/components/AccessLocked";
import PageHeader from "@/app/components/PageHeader";
import PageFallback from "@/app/components/PageFallback";
import RoadmapSkeleton from "@/app/components/skeletons/RoadmapSkeleton";
import Button from "@/app/components/ui/Button";

import {
  RoadmapCard,
  TaskItem,
  RoadmapSection,
  Task,
  loadCardDataForSlug,
  saveCardDataForSlug,
  loadRoadmapCards,
  loadStoredTasks,
  saveStoredTasks,
  loadStoredProfile,
  recordTaskCompletion,
} from "@/app/lib/storage";
import ProgressBarCard from "@/app/components/ProgressBarCard";
import AddHeadingInput from "@/app/components/AddHeadingInput";
import RoadmapSectionCard from "@/app/components/RoadmapSectionCard";
import HeaderCount from "@/app/components/HeaderCount";

// Removed demo/default roadmap cards — load only persisted cards.

export default function RoadmapDetail() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [card, setCard] = useState<RoadmapCard | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [sections, setSections] = useState<RoadmapSection[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Input states
  const [isAddingHeading, setIsAddingHeading] = useState(false);
  const [newHeadingText, setNewHeadingText] = useState("");
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [editHeadingText, setEditHeadingText] = useState("");
  const [newTaskTexts, setNewTaskTexts] = useState<Record<number, string>>({});
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [draftTaskText, setDraftTaskText] = useState("");

  const syncMainTaskCompletion = (updatedSections: RoadmapSection[], currentCard: RoadmapCard | null) => {
    if (!currentCard) return;
    const total = updatedSections.reduce((sum, s) => sum + s.tasks.length, 0);
    const completed = updatedSections.reduce((sum, s) => sum + s.tasks.filter((t) => t.completed).length, 0);
    const isCompleted = total > 0 && completed === total;

    const mainTasks = loadStoredTasks();
    const updatedMainTasks = mainTasks.map((t) => {
      if (t.slug === currentCard.slug) {
        return { ...t, completed: isCompleted };
      }
      return t;
    });
    saveStoredTasks(updatedMainTasks);
  };

  useEffect(() => {
    if (!slug) {
      return;
    }

    const allCards = loadRoadmapCards();
    const found = allCards.find((item) => item.slug === slug) ?? null;
    requestAnimationFrame(() => {
      setCard(found);
      setLoaded(true);
    });
  }, [slug]);

  useEffect(() => {
    if (!card) return;

    const loadAll = () => {
      const existing = loadCardDataForSlug(card.slug);
      const profile = loadStoredProfile();
      const storedTasks = loadStoredTasks();

      // Determine sections to set and any persistence needed
      let sectionsToSet: RoadmapSection[] | null = null;
      let persistSections: RoadmapSection[] | null = null;

      if (existing.sections && existing.sections.length > 0) {
        sectionsToSet = existing.sections;
      } else if (Array.isArray(existing.tasks) && existing.tasks.length > 0) {
        const migratedSection: RoadmapSection = {
          id: Date.now(),
          heading: "General",
          tasks: existing.tasks,
        };
        sectionsToSet = [migratedSection];
        persistSections = sectionsToSet;
      } else {
        const items = card.items?.length ? card.items : card.description ? [card.description] : [];
        const defaultTasks: TaskItem[] = items.map((item, index) => ({
          id: Date.now() + index,
          text: item,
          completed: false,
        }));
        sectionsToSet = [
          {
            id: Date.now(),
            heading: "General",
            tasks: defaultTasks,
          },
        ];
        persistSections = sectionsToSet;
      }

      // Apply state updates in a single animation frame for smoother rendering
      requestAnimationFrame(() => {
        setIsLoggedIn(!!profile?.username);
        if (sectionsToSet) setSections(sectionsToSet);
      });

      if (persistSections) {
        saveCardDataForSlug(card.slug, { tasks: [], sections: persistSections });
      }

      if (sectionsToSet) syncMainTaskCompletion(sectionsToSet, card);
    };

    loadAll();
    window.addEventListener("localstorage-sync", loadAll);
    return () => window.removeEventListener("localstorage-sync", loadAll);
  }, [card]);

  if (!loaded) {
    return (
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          <RoadmapSkeleton />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AccessLocked />;
  }

  if (!card) {
    return <PageFallback state="notfound" message={`No roadmap found for ${slug}.`} />;
  }

  const totalCount = sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const completedCount = sections.reduce((sum, s) => sum + s.tasks.filter((t) => t.completed).length, 0);
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddHeading = () => {
    const text = newHeadingText.trim();
    if (!text || !card) return;

    const newSection: RoadmapSection = {
      id: Date.now(),
      heading: text,
      tasks: [],
    };
    const updated = [...sections, newSection];
    setSections(updated);
    saveCardDataForSlug(card.slug, { tasks: [], sections: updated });
    syncMainTaskCompletion(updated, card);
    
    setNewHeadingText("");
    setIsAddingHeading(false);
  };

  const handleSaveEditHeading = (sectionId: number) => {
    const text = editHeadingText.trim();
    if (!text || !card) return;

    const updated = sections.map((s) =>
      s.id === sectionId ? { ...s, heading: text } : s
    );
    setSections(updated);
    saveCardDataForSlug(card.slug, { tasks: [], sections: updated });

    setEditingSectionId(null);
    setEditHeadingText("");
  };

  const handleRemoveHeading = (sectionId: number) => {
    if (!card) return;
    const updated = sections.filter((s) => s.id !== sectionId);
    setSections(updated);
    saveCardDataForSlug(card.slug, { tasks: [], sections: updated });
    syncMainTaskCompletion(updated, card);
  };

  const handleAddTaskToSection = (sectionId: number) => {
    const text = newTaskTexts[sectionId]?.trim();
    if (!text || !card) return;

    const newTask: TaskItem = {
      id: Date.now(),
      text,
      completed: false,
    };

    const updated = sections.map((s) => {
      if (s.id === sectionId) {
        return { ...s, tasks: [...s.tasks, newTask] };
      }
      return s;
    });

    setSections(updated);
    saveCardDataForSlug(card.slug, { tasks: [], sections: updated });
    syncMainTaskCompletion(updated, card);

    setNewTaskTexts((prev) => ({ ...prev, [sectionId]: "" }));
  };

  const handleRemoveTaskFromSection = (sectionId: number, taskId: number) => {
    if (!card) return;
    const updated = sections.map((s) => {
      if (s.id === sectionId) {
        return { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) };
      }
      return s;
    });
    setSections(updated);
    saveCardDataForSlug(card.slug, { tasks: [], sections: updated });
    syncMainTaskCompletion(updated, card);

    if (editingTaskId === taskId) {
      setEditingTaskId(null);
      setDraftTaskText("");
    }
  };

  const handleToggleTaskInSection = (sectionId: number, taskId: number) => {
    if (!card) return;
    const currentSection = sections.find((s) => s.id === sectionId) ?? null;
    const currentTask = currentSection?.tasks.find((t) => t.id === taskId) ?? null;
    const updated = sections.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          tasks: s.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        };
      }
      return s;
    });
    setSections(updated);
    saveCardDataForSlug(card.slug, { tasks: [], sections: updated });
    syncMainTaskCompletion(updated, card);

    if (currentTask && !currentTask.completed) {
      const totalTasks = updated.reduce((sum, section) => sum + section.tasks.length, 0);
      recordTaskCompletion({
        taskId: currentTask.id,
        taskTitle: currentTask.text,
        roadmapSlug: card.slug,
        roadmapTitle: card.title,
        sectionHeading: currentSection?.heading,
        totalTasks,
      });
    }
  };

  const handleSaveTaskEdit = (sectionId: number, taskId: number) => {
    const text = draftTaskText.trim();
    if (!text || !card) return;

    const updated = sections.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          tasks: s.tasks.map((t) =>
            t.id === taskId ? { ...t, text } : t
          ),
        };
      }
      return s;
    });
    setSections(updated);
    saveCardDataForSlug(card.slug, { tasks: [], sections: updated });

    setEditingTaskId(null);
    setDraftTaskText("");
  };

  return (
    <div className="p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            {/* Header section with counts */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <PageHeader title={card.title} />
              <HeaderCount completed={completedCount} total={totalCount} />
            </div>

            {/* Section groupings list */}
            <div className="space-y-6">
              {sections.map((section) => (
                <RoadmapSectionCard
                  key={section.id}
                  section={section}
                  editingSectionId={editingSectionId}
                  editHeadingText={editHeadingText}
                  onEditHeadingChange={(e) => setEditHeadingText(e.target.value)}
                  onStartEditSection={(sectionId) => {
                    setEditingSectionId(sectionId);
                    setEditHeadingText(sections.find((s) => s.id === sectionId)?.heading ?? "");
                  }}
                  onSaveEditHeading={handleSaveEditHeading}
                  onCancelEditHeading={() => setEditingSectionId(null)}
                  onRemoveHeading={handleRemoveHeading}
                  editingTaskId={editingTaskId}
                  draftTaskText={draftTaskText}
                  onDraftTaskChange={(e) => setDraftTaskText(e.target.value)}
                  onStartEditTask={(taskId, text) => {
                    setEditingTaskId(taskId);
                    setDraftTaskText(text);
                  }}
                  onSaveTaskEdit={handleSaveTaskEdit}
                  onCancelTaskEdit={() => {
                    setEditingTaskId(null);
                    setDraftTaskText("");
                  }}
                  onRemoveTask={handleRemoveTaskFromSection}
                  onToggleTask={handleToggleTaskInSection}
                  newTaskText={newTaskTexts[section.id] ?? ""}
                  onNewTaskChange={(e) =>
                    setNewTaskTexts((prev) => ({ ...prev, [section.id]: e.target.value }))
                  }
                  onClearNewTask={() =>
                    setNewTaskTexts((prev) => ({ ...prev, [section.id]: "" }))
                  }
                  onAddTask={handleAddTaskToSection}
                />
              ))}
            </div>

            {/* Heading adding section with Dynamic Plus Icon Placement */}
            <div className="mt-6 border-t border-zinc-800 pt-6">
              {isAddingHeading ? (
                <AddHeadingInput
                  value={newHeadingText}
                  onChange={(e) => setNewHeadingText(e.target.value)}
                  onCreate={handleAddHeading}
                  onCancel={() => {
                    setIsAddingHeading(false);
                    setNewHeadingText("");
                  }}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setIsAddingHeading(true)}
                    variant="secondary"
                    icon={<span className="text-lg leading-none">+</span>}
                    aria-label="Add new heading"
                  >
                    Add Section Heading
                  </Button>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <ProgressBarCard completionPercent={completionPercent} />
          </aside>
        </div>
      </div>
    </div>
  );
}
