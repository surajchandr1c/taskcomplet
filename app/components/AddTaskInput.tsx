import React from "react";

type AddTaskInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onClear?: () => void;
  placeholder?: string;
};

export default function AddTaskInput({
  value,
  onChange,
  onAdd,
  onClear,
  placeholder = "Add a task to this section...",
}: AddTaskInputProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 p-2">
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") onAdd();
        }}
        className="h-9 min-w-[180px] flex-1 border-0 bg-transparent px-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
      />
      <button
        type="button"
        onClick={onAdd}
        className="flex-shrink-0 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500"
      >
        Add Task
      </button>
    </div>
  );
}
