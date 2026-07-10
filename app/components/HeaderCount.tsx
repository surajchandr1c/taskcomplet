import React from "react";

type HeaderCountProps = {
  completed: number;
  total: number;
  className?: string;
};

export default function HeaderCount({ completed, total, className = "" }: HeaderCountProps) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-300 ${className}`}>
      <span className="font-semibold text-white">{completed}</span>
      <span>/</span>
      <span className="text-zinc-400">{total}</span>
    </div>
  );
}
