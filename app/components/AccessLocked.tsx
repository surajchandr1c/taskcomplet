import React from "react";
import Link from "next/link";

type AccessLockedProps = {
  message?: string;
};

export default function AccessLocked({ message = "Please log in or register your profile to view this roadmap's tasks and details." }: AccessLockedProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 min-h-[calc(100vh-8rem)]">
      <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center shadow-2xl space-y-6">
        <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Access Locked</h2>
          <p className="text-zinc-400 text-sm">{message}</p>
        </div>
        <div>
          <Link href="/profile" className="inline-block w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-sm transition-colors shadow-lg">
            Go to Login / Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
