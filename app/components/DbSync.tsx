"use client";

import { useEffect } from "react";
import { loadStoredProfile } from "@/app/lib/storage";

export default function DbSync() {
  useEffect(() => {
    const profile = loadStoredProfile();
    const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null;
    if (!profile || !profile.username || !token) return;

    fetch("/api/user-data", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch");
      })
      .then((data) => {
        if (data && data.username) {
          let hasChanges = false;

          const localProfileStr = window.localStorage.getItem("profileData");
          const localProfile = localProfileStr ? JSON.parse(localProfileStr) : null;
          const remoteProfile = {
            name: data.name || "Suraj Kumar",
            username: data.username,
            about: data.about || ""
          };

          if (JSON.stringify(localProfile) !== JSON.stringify(remoteProfile)) {
            window.localStorage.setItem("profileData", JSON.stringify(remoteProfile));
            hasChanges = true;
          }

          if (data.tasks) {
            const localTasksStr = window.localStorage.getItem("taskList");
            if (JSON.stringify(localTasksStr ? JSON.parse(localTasksStr) : []) !== JSON.stringify(data.tasks)) {
              window.localStorage.setItem("taskList", JSON.stringify(data.tasks));
              hasChanges = true;
            }
          }

          if (data.roadmapCards) {
            const localRoadmapsStr = window.localStorage.getItem("roadmapCards");
            if (JSON.stringify(localRoadmapsStr ? JSON.parse(localRoadmapsStr) : []) !== JSON.stringify(data.roadmapCards)) {
              window.localStorage.setItem("roadmapCards", JSON.stringify(data.roadmapCards));
              hasChanges = true;
            }
          }

          if (data.roadmapCardTasks) {
            const localSubtasksStr = window.localStorage.getItem("roadmapCardTasks");
            if (JSON.stringify(localSubtasksStr ? JSON.parse(localSubtasksStr) : {}) !== JSON.stringify(data.roadmapCardTasks)) {
              window.localStorage.setItem("roadmapCardTasks", JSON.stringify(data.roadmapCardTasks));
              hasChanges = true;
            }
          }

          if (data.taskCompletionHistory) {
            const localHistoryStr = window.localStorage.getItem("taskCompletionHistory");
            if (JSON.stringify(localHistoryStr ? JSON.parse(localHistoryStr) : {}) !== JSON.stringify(data.taskCompletionHistory)) {
              window.localStorage.setItem("taskCompletionHistory", JSON.stringify(data.taskCompletionHistory));
              hasChanges = true;
            }
          }

          if (hasChanges) {
            window.dispatchEvent(new Event("localstorage-sync"));
          }
        }
      })
      .catch((err) => console.error("Database synchronization failed:", err));
  }, []);

  return null;
}
