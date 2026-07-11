import React from "react";
import { TaskItem } from "@/app/lib/storage";
import RemoveButton from "@/app/components/RemoveButton";
import EditButton from "@/app/components/EditButton";

type TaskActionsProps = {
  sectionId: number;
  task: TaskItem;
  editingTaskId: number | null;
  onStartEditTask: (taskId: number, text: string) => void;
  onSaveTaskEdit: (sectionId: number, taskId: number) => void;
  onCancelTaskEdit: () => void;
  onRemoveTask: (sectionId: number, taskId: number) => void;
};

export default function TaskActions({
  sectionId,
  task,
  editingTaskId,
  onStartEditTask,
  onSaveTaskEdit,
  onCancelTaskEdit,
  onRemoveTask,
}: TaskActionsProps) {
  const isEditing = editingTaskId === task.id;

  if (isEditing) {
    return (
      <>
        <button
          type="button"
          onClick={() => onSaveTaskEdit(sectionId, task.id)}
          className="rounded bg-blue-600 px-2.5 py-1 text-xs text-white hover:bg-blue-500"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancelTaskEdit}
          className="rounded border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 hover:text-white"
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <>
      <EditButton onClick={() => onStartEditTask(task.id, task.text)} />
      <RemoveButton onClick={() => onRemoveTask(sectionId, task.id)} />
    </>
  );
}
