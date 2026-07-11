import React from "react";
import { RoadmapSection } from "@/app/lib/storage";
import AddTaskInput from "@/app/components/AddTaskInput";
import RemoveButton from "@/app/components/RemoveButton";
import TaskActions from "@/app/components/TaskActions";
import EditButton from "@/app/components/EditButton";

type RoadmapSectionCardProps = {
  section: RoadmapSection;
  editingSectionId: number | null;
  editHeadingText: string;
  onEditHeadingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartEditSection: (sectionId: number) => void;
  onSaveEditHeading: (sectionId: number) => void;
  onCancelEditHeading: () => void;
  onRemoveHeading: (sectionId: number) => void;
  editingTaskId: number | null;
  draftTaskText: string;
  onDraftTaskChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartEditTask: (taskId: number, text: string) => void;
  onSaveTaskEdit: (sectionId: number, taskId: number) => void;
  onCancelTaskEdit: () => void;
  onRemoveTask: (sectionId: number, taskId: number) => void;
  onToggleTask: (sectionId: number, taskId: number) => void;
  newTaskText: string;
  onNewTaskChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearNewTask: () => void;
  onAddTask: (sectionId: number) => void;
};

export default function RoadmapSectionCard({
  section,
  editingSectionId,
  editHeadingText,
  onEditHeadingChange,
  onStartEditSection,
  onSaveEditHeading,
  onCancelEditHeading,
  onRemoveHeading,
  editingTaskId,
  draftTaskText,
  onDraftTaskChange,
  onStartEditTask,
  onSaveTaskEdit,
  onCancelTaskEdit,
  onRemoveTask,
  onToggleTask,
  newTaskText,
  onNewTaskChange,
  onClearNewTask,
  onAddTask,
}: RoadmapSectionCardProps) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
        <div className="flex-1">
          {editingSectionId === section.id ? (
            <div className="flex items-center gap-2">
              <input
                value={editHeadingText}
                onChange={onEditHeadingChange}
                className="h-9 flex-1 rounded border border-zinc-700 bg-zinc-900 px-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSaveEditHeading(section.id);
                  if (e.key === "Escape") onCancelEditHeading();
                }}
                autoFocus
              />
              <button
                onClick={() => onSaveEditHeading(section.id)}
                className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500"
              >
                Save
              </button>
              <button
                onClick={onCancelEditHeading}
                className="rounded bg-zinc-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
          )}
        </div>

        {editingSectionId !== section.id && (
          <div className="flex items-center gap-2">
            <EditButton
              onClick={() => onStartEditSection(section.id)}
              className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 px-3"
            />
            <button
              onClick={() => onRemoveHeading(section.id)}
              className="rounded border border-red-900/60 bg-red-950/40 px-3 py-1 text-xs text-red-400 transition-colors hover:bg-red-900/60 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {section.tasks.length === 0 ? (
          <div className="py-3 text-center text-xs text-zinc-500">No tasks in this section yet.</div>
        ) : (
          section.tasks.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800/80 bg-zinc-900/20 p-3 transition-colors hover:border-zinc-800"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleTask(section.id, item.id)}
                  className="h-4.5 w-4.5 cursor-pointer rounded border border-zinc-700 bg-zinc-950 accent-blue-500 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                />
                <div className="min-w-0 flex-1">
                  {editingTaskId === item.id ? (
                    <input
                      value={draftTaskText}
                      onChange={onDraftTaskChange}
                      className="h-8 w-full rounded border border-zinc-700 bg-zinc-900 px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") onSaveTaskEdit(section.id, item.id);
                        if (e.key === "Escape") onCancelTaskEdit();
                      }}
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`text-sm break-words ${
                        item.completed ? "text-zinc-500 line-through" : "text-zinc-300"
                      }`}
                    >
                      {item.text}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <TaskActions
                  sectionId={section.id}
                  task={item}
                  editingTaskId={editingTaskId}
                  onStartEditTask={onStartEditTask}
                  onSaveTaskEdit={onSaveTaskEdit}
                  onCancelTaskEdit={onCancelTaskEdit}
                  onRemoveTask={onRemoveTask}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <AddTaskInput
        value={newTaskText}
        onChange={onNewTaskChange}
        onAdd={() => onAddTask(section.id)}
        onClear={onClearNewTask}
      />
    </div>
  );
}
