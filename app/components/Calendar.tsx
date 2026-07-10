"use client";
import React, { useEffect, useMemo, useState } from "react";

import {
  DailyTaskProgress,
  loadTaskCompletionHistory,
  TaskCompletionHistory,
} from "@/app/lib/storage";

function getMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: Array<Array<number | null>> = [];
  let week: Array<number | null> = new Array(7).fill(null);
  let day = 1;

  // Fill first week
  for (let i = startDay; i < 7; i++) {
    week[i] = day++;
  }
  weeks.push(week.slice());

  while (day <= daysInMonth) {
    week = new Array(7).fill(null);
    for (let i = 0; i < 7 && day <= daysInMonth; i++) {
      week[i] = day++;
    }
    weeks.push(week.slice());
  }

  return weeks;
}

export default function Calendar({ isEnabled = true }: { isEnabled?: boolean }): React.ReactElement {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [history, setHistory] = useState<TaskCompletionHistory>({});
  const [selectedDateKey, setSelectedDateKey] = useState(getDateKey(today));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const weeks = useMemo(() => getMonthMatrix(year, month), [year, month]);

  const goToMonth = (offset: number) => {
    const nextDate = new Date(year, month + offset, 1);
    setViewDate(nextDate);

    const nextIsCurrentMonth =
      nextDate.getMonth() === today.getMonth() && nextDate.getFullYear() === today.getFullYear();
    setSelectedDateKey(
      nextIsCurrentMonth ? getDateKey(today) : getDateKey(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1))
    );
  };

  const prev = () => goToMonth(-1);
  const next = () => goToMonth(1);

  useEffect(() => {
    if (!isEnabled) return;

    const loadHistory = () => {
      setHistory(loadTaskCompletionHistory());
    };

    loadHistory();
    window.addEventListener("localstorage-sync", loadHistory);
    return () => window.removeEventListener("localstorage-sync", loadHistory);
  }, [isEnabled]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const isToday = (d: number | null) => {
    if (d === null) return false;
    return (
      d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
    );
  };

  const visibleHistory = isEnabled ? history : {};
  const selectedDay = visibleHistory[selectedDateKey] ?? null;

  const selectedLabel = (() => {
    const date = new Date(`${selectedDateKey}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? selectedDateKey
      : date.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
  })();

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <div className="text-lg font-semibold text-white">{monthNames[month]} {year}</div>
          <div className="text-xs text-zinc-400">
            {isEnabled ? "Green days indicate at least one completed task." : "Log in to view completion history."}
          </div>
        </div>
        <div className="space-x-2">
          <button onClick={prev} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 transition-colors">Prev</button>
          <button onClick={next} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 transition-colors">Next</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
          <div key={d} className="font-medium text-xs text-zinc-500">{d}</div>
        ))}

        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const dateKey = day ? getDateKey(new Date(year, month, day)) : null;

            return (
              <button
                key={`w${wi}-d${di}`}
                type="button"
                onClick={() => {
                  if (dateKey) {
                    setSelectedDateKey(dateKey);
                  }
                }}
                className={[
                  "relative p-2 rounded-xl h-11 flex items-center justify-center text-sm transition-all border",
                  day
                    ? "border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-200"
                    : "border-transparent text-zinc-600 cursor-default",
                  dateKey && visibleHistory[dateKey]
                    ? "bg-emerald-600/80 border-emerald-400/50 text-white"
                    : "",
                  dateKey && isToday(day) && !visibleHistory[dateKey]
                    ? "bg-blue-600 border-blue-400 text-white"
                    : "",
                  dateKey && selectedDateKey === dateKey
                    ? "ring-2 ring-emerald-300 ring-offset-2 ring-offset-zinc-950"
                    : "",
                ].join(" ")}
              >
                <span>{day ?? ""}</span>
                {dateKey && visibleHistory[dateKey] && (
                  <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-white/90" />
                )}
              </button>
            );
          })
        )}
      </div>

      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm font-semibold text-white">{isEnabled ? selectedLabel : "Login required"}</div>
            <div className="text-xs text-zinc-400">
              {isEnabled
                ? "Click any date to see that day's completed task history."
                : "Your day-by-day progress will appear after login."}
            </div>
          </div>
          {selectedDay && (
            <div className="text-xs text-zinc-300">
              {selectedDay.completedCount} completed
            </div>
          )}
        </div>

        {selectedDay ? (
          <DayProgressView progress={selectedDay} />
        ) : (
          <div className="mt-3 text-sm text-zinc-500">
            {isEnabled ? "No completed tasks recorded for this date." : "Log in to view your daily progress."}
          </div>
        )}
      </div>
    </div>
  );
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DayProgressView({ progress }: { progress: DailyTaskProgress }) {
  const percent = progress.totalTasks > 0
    ? Math.round((progress.completedCount / progress.totalTasks) * 100)
    : 0;

  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm font-medium text-emerald-200">Completed tasks</div>
            <div className="text-2xl font-semibold text-white">
              {progress.completedCount}
              <span className="text-base text-zinc-300"> / {progress.totalTasks}</span>
            </div>
          </div>
          <div className="text-sm font-semibold text-emerald-200">{percent}% progress</div>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-950/60">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Completed on this day</div>
        {progress.records.length === 0 ? (
          <div className="text-sm text-zinc-500">No task history available.</div>
        ) : (
          progress.records.map((record) => (
            <div key={record.key} className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white break-words">{record.taskTitle}</div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {record.roadmapTitle ? `${record.roadmapTitle} - ` : ""}
                    {record.sectionHeading ? `${record.sectionHeading} - ` : ""}
                    {new Date(record.completedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </div>
                </div>
                <div className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                  Done
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
