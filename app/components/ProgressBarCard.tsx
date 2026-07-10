import React from "react";

type ProgressBarCardProps = {
  title?: string;
  completionPercent: number;
};

export default function ProgressBarCard({ title = "Completion", completionPercent }: ProgressBarCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-950 p-5 shadow-xl">
      <div className="flex flex-col items-center gap-3">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Progress</div>
          <h2 className="mt-2 text-lg font-semibold text-white">{title}</h2>
        </div>

        <div className="flex h-72 w-8 items-end overflow-hidden rounded-full bg-zinc-800">
          <div
            className="w-full rounded-full bg-emerald-400 transition-all duration-300"
            style={{ height: `${completionPercent}%` }}
          />
        </div>

        <div className="text-2xl font-bold text-white">{completionPercent}%</div>
      </div>
    </div>
  );
}
