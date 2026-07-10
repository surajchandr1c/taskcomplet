"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/app/components/PageHeader";

interface User {
  id: string;
  name: string;
  username: string;
  about: string;
  tasksCount: number;
  roadmapsCount: number;
  createdAt: string;
}

export default function AdminUsersPage(): React.ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        throw new Error("Failed to fetch user list.");
      }
      const data = await res.json();
      setUsers(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const confirmDelete = (user: User) => {
    setDeleteTarget(user);
    setDeleteError("");
  };

  const executeDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`/api/admin/users?username=${encodeURIComponent(deleteTarget.username)}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete user.");
      }

      // Remove from list and close modal
      setUsers(users.filter((u) => u.username !== deleteTarget.username));
      setDeleteTarget(null);
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : "Failed to complete deletion.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-zinc-900 rounded" />
        <div className="h-12 bg-zinc-950 border border-zinc-900 rounded-xl" />
        <div className="border border-zinc-900 bg-zinc-950 rounded-xl h-96" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-red-950/20 border border-red-800/50 text-red-400">
        <h3 className="font-bold text-lg mb-2">Error Loading Users</h3>
        <p className="text-sm">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError("");
            fetchUsers();
          }}
          className="mt-4 px-4 py-2 bg-red-800 text-white rounded text-sm hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <div>
        <PageHeader title="User Management" className="mb-2" />
        <p className="text-zinc-500 text-xs sm:text-sm">Manage user accounts, view usage stats, and delete profiles.</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or @username..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-zinc-700 focus:outline-none"
        />
      </div>

      {/* Users Table / List */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-500 bg-zinc-950/60 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="p-4 sm:p-5">User</th>
                  <th className="p-4 sm:p-5">Bio / About</th>
                  <th className="p-4 sm:p-5 text-center">Tasks</th>
                  <th className="p-4 sm:p-5 text-center">Roadmaps</th>
                  <th className="p-4 sm:p-5">Joined</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 sm:p-5">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-zinc-500 text-xs">@{user.username}</div>
                    </td>
                    <td className="p-4 sm:p-5 max-w-xs truncate text-zinc-400">
                      {user.about || <span className="text-zinc-600 italic">No biography</span>}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-medium text-white">{user.tasksCount}</td>
                    <td className="p-4 sm:p-5 text-center font-medium text-white">{user.roadmapsCount}</td>
                    <td className="p-4 sm:p-5 text-zinc-400">
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <button
                        onClick={() => confirmDelete(user)}
                        className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 text-xs font-semibold transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-zinc-500 border-t border-zinc-900">
              No users matching your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          
          {/* Modal box */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-2">Delete User Profile?</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Are you sure you want to permanently delete the profile for <strong className="text-white">{deleteTarget.name}</strong> (@{deleteTarget.username})? This will delete all of their synchronized tasks and roadmaps. This action cannot be undone.
            </p>

            {deleteError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/20 border border-red-800/50 text-red-400 text-xs flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span>{deleteError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 text-sm font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={executeDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
              >
                {deleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
