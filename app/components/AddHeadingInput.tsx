import React from "react";

type AddHeadingInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
  onCancel: () => void;
  placeholder?: string;
};

export default function AddHeadingInput({
  value,
  onChange,
  onCreate,
  onCancel,
  placeholder = "e.g. Authentication, Deployment...",
}: AddHeadingInputProps) {
  return (
    <div className="max-w-md rounded-xl border border-zinc-700 bg-zinc-950 p-4 space-y-3">
      <label className="block text-sm font-medium text-zinc-300">New Section Heading</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") onCreate();
        }}
        className="h-10 w-full rounded border border-zinc-700 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        autoFocus
      />
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCreate}
          className="rounded bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-500"
        >
          Create Heading
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-xs text-zinc-300 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
