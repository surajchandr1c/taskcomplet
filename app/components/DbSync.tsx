"use client";

import { useEffect } from "react";
import { loadStoredProfile, syncToDatabase } from "@/app/lib/storage";
import { defaultFrontendCardData } from "@/app/lib/defaultFrontend";
import { defaultBackendCardData } from "@/app/lib/defaultBackend";
import { defaultMachineLearningCardData } from "@/app/lib/defaultMachineLearning";
import { defaultOtherRoadmapCards, defaultOtherRoadmapsData } from "@/app/lib/defaultOtherRoadmaps";

import { getUserData } from "@/app/lib/api/user";

export default function DbSync() {
  useEffect(() => {
    const profile = loadStoredProfile();
    const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null;
    if (!profile || !profile.username || !token) return;

    getUserData(token)
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

          const remoteTasks = data.tasks || [];
          const localTasksStr = window.localStorage.getItem("taskList");
          if (JSON.stringify(localTasksStr ? JSON.parse(localTasksStr) : []) !== JSON.stringify(remoteTasks)) {
            window.localStorage.setItem("taskList", JSON.stringify(remoteTasks));
            hasChanges = true;
          }

          let remoteRoadmaps = data.roadmapCards || [];
          if (!remoteRoadmaps.some((r: any) => r.slug === "frontend")) {
            remoteRoadmaps = [
              {
                title: "Frontend",
                slug: "frontend",
                description: "Complete guide to modern frontend web development.",
                items: [
                  "Internet", "Version Control", "HTML", "CSS", "JavaScript",
                  "Package Managers", "Module Bundlers", "Linters & Formatters",
                  "TypeScript", "React", "Next.js", "State Management",
                  "API Handling", "Authentication", "Testing", "Performance Optimization",
                  "Web Security", "Browser APIs", "Progressive Web Apps (PWA)",
                  "Build & Deployment", "UI Libraries", "Animation Libraries",
                  "Design & UI/UX", "SEO", "MERN Stack Integration"
                ]
              },
              ...remoteRoadmaps
            ];
          }
          if (!remoteRoadmaps.some((r: any) => r.slug === "backend")) {
            remoteRoadmaps = [
              {
                title: "Backend",
                slug: "backend",
                description: "Complete guide to modern backend web development.",
                items: [
                  "Internet Fundamentals", "Operating System (Linux)", "Version Control",
                  "Programming Language (Node.js)", "Package Managers", "Node.js Core",
                  "Express.js", "Databases", "ORM / ODM", "API Development",
                  "Authentication & Authorization", "Security", "File Handling", "Caching",
                  "Background Jobs & Queues", "Logging & Monitoring", "Testing", "Docker",
                  "CI/CD", "Deployment", "Cloud Services", "Performance Optimization",
                  "System Design", "DevOps Basics", "Advanced Backend", "MERN Stack Integration"
                ]
              },
              ...remoteRoadmaps
            ];
          }

          const mlIndex = remoteRoadmaps.findIndex((r: any) => r.slug === "machin-learning");
          if (mlIndex === -1) {
            remoteRoadmaps = [
              {
                title: "Machin Learning",
                slug: "machin-learning",
                description: "For AI and ML",
                items: [
                  "Mathematics for Machine Learning", "Python Programming", "Data Preprocessing",
                  "Exploratory Data Analysis (EDA)", "Machine Learning Fundamentals", "Supervised Learning",
                  "Unsupervised Learning", "Model Evaluation", "Hyperparameter Tuning",
                  "Deep Learning", "Natural Language Processing", "Computer Vision",
                  "Time Series Analysis", "Reinforcement Learning", "MLOps", "Deployment"
                ]
              },
              ...remoteRoadmaps
            ];
          } else if (!remoteRoadmaps[mlIndex].items || remoteRoadmaps[mlIndex].items.length === 0) {
            remoteRoadmaps[mlIndex].items = [
              "Mathematics for Machine Learning", "Python Programming", "Data Preprocessing",
              "Exploratory Data Analysis (EDA)", "Machine Learning Fundamentals", "Supervised Learning",
              "Unsupervised Learning", "Model Evaluation", "Hyperparameter Tuning",
              "Deep Learning", "Natural Language Processing", "Computer Vision",
              "Time Series Analysis", "Reinforcement Learning", "MLOps", "Deployment"
            ];
          }

          defaultOtherRoadmapCards.forEach((otherCard) => {
            const idx = remoteRoadmaps.findIndex((r: any) => r.slug === otherCard.slug);
            if (idx === -1) {
              remoteRoadmaps = [...remoteRoadmaps, otherCard];
            } else if (!remoteRoadmaps[idx].items || remoteRoadmaps[idx].items.length === 0) {
              remoteRoadmaps[idx].items = otherCard.items;
            }
          });

          const localRoadmapsStr = window.localStorage.getItem("roadmapCards");
          if (JSON.stringify(localRoadmapsStr ? JSON.parse(localRoadmapsStr) : []) !== JSON.stringify(remoteRoadmaps)) {
            window.localStorage.setItem("roadmapCards", JSON.stringify(remoteRoadmaps));
            hasChanges = true;
          }

          let remoteCardTasks = data.roadmapCardTasks || {};
          if (
            !remoteCardTasks.frontend ||
            !remoteCardTasks.frontend.sections ||
            remoteCardTasks.frontend.sections.length < 25
          ) {
            remoteCardTasks = {
              ...remoteCardTasks,
              frontend: defaultFrontendCardData
            };
          }
          if (
            !remoteCardTasks.backend ||
            !remoteCardTasks.backend.sections ||
            remoteCardTasks.backend.sections.length < 26
          ) {
            remoteCardTasks = {
              ...remoteCardTasks,
              backend: defaultBackendCardData
            };
          }
          if (
            !remoteCardTasks["machin-learning"] ||
            !remoteCardTasks["machin-learning"].sections ||
            remoteCardTasks["machin-learning"].sections.length < 26
          ) {
            remoteCardTasks = {
              ...remoteCardTasks,
              "machin-learning": defaultMachineLearningCardData
            };
          }

          Object.keys(defaultOtherRoadmapsData).forEach((otherSlug) => {
            const otherData = defaultOtherRoadmapsData[otherSlug];
            const otherSectionsCount = otherData.sections?.length || 0;
            if (
              !remoteCardTasks[otherSlug] ||
              !remoteCardTasks[otherSlug].sections ||
              remoteCardTasks[otherSlug].sections.length < otherSectionsCount
            ) {
              remoteCardTasks = {
                ...remoteCardTasks,
                [otherSlug]: otherData
              };
            }
          });

          const localSubtasksStr = window.localStorage.getItem("roadmapCardTasks");
          if (JSON.stringify(localSubtasksStr ? JSON.parse(localSubtasksStr) : {}) !== JSON.stringify(remoteCardTasks)) {
            window.localStorage.setItem("roadmapCardTasks", JSON.stringify(remoteCardTasks));
            hasChanges = true;
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
            syncToDatabase();
          }
        }
      })
      .catch((err) => console.error("Database synchronization failed:", err));
  }, []);

  return null;
}
