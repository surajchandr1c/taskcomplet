"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): React.ReactElement {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      if (typeof window !== "undefined") {
        const profile = window.localStorage.getItem("profileData");
        setIsLoggedIn(!!profile);
      }
    };

    checkLogin();
    window.addEventListener("localstorage-sync", checkLogin);
    return () => window.removeEventListener("localstorage-sync", checkLogin);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("profileData");
      window.localStorage.removeItem("taskList");
      window.localStorage.removeItem("roadmapCards");
      window.localStorage.removeItem("roadmapCardTasks");
      window.localStorage.removeItem("taskCompletionHistory");

      window.dispatchEvent(new Event("localstorage-sync"));
      onClose();
      router.push("/profile");
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        className={`fixed inset-0 top-16 z-30 bg-black/50 transition-opacity md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={[
          "fixed top-16 z-40 flex h-[calc(100vh-4rem)] w-72 flex-col border-t-2 border-l-2 border-zinc-300/70 bg-black text-white shadow-2xl transition-transform duration-300 ease-out right-0 left-auto will-change-transform md:w-64 md:left-0 md:right-auto md:border-l-0 md:border-r-2 md:border-t-2 md:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <Link href="/" onClick={onClose} className="block rounded px-3 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1">
            Home
          </Link>
          <Link href="/add" onClick={onClose} className="block rounded px-3 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1">
            Add Task
          </Link>
          <Link href="/tasks" onClick={onClose} className="block rounded px-3 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1">
            Task List
          </Link>
          <Link href="/roadmap" onClick={onClose} className="block rounded px-3 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1">
            Roadmap
          </Link>
        </nav>

        <div className="p-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full rounded bg-red-600 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/profile"
              onClick={onClose}
              className="block w-full rounded bg-blue-600 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
