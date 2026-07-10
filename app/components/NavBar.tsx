import React from "react";
import Link from "next/link";

export default function NavBar({ onMenuClick }: { onMenuClick: () => void }): React.ReactElement {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/60 dark:bg-black/60 border-b-2 border-zinc-300/70 dark:border-zinc-200/70">
      <div className="mx-auto w-full max-w-[90rem] px-1 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex flex-col items-start cursor-pointer gap-0">
              <div className="text-2xl font-extrabold leading-none mb-[2px]">TC</div>
              <div className="text-xs -mt-1 text-zinc-600 dark:text-zinc-400">TaskComplet</div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/profile" aria-label="Profile">
              <button
                aria-label="User profile"
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-gray-700 dark:text-gray-200"
                  fill="currentColor"
                >
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2a5 5 0 0 1 10 0h2c0-3.866-3.134-7-7-7z" />
                </svg>
              </button>
            </Link>

            <button
              type="button"
              onClick={onMenuClick}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white/80 text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
