export interface Task {
  id: number;
  title: string;
  completed: boolean;
  slug?: string;
}

export interface TaskCompletionRecord {
  key: string;
  taskId: number;
  taskTitle: string;
  roadmapSlug?: string;
  roadmapTitle?: string;
  sectionHeading?: string;
  completedAt: string;
}

export interface DailyTaskProgress {
  date: string;
  completedCount: number;
  totalTasks: number;
  records: TaskCompletionRecord[];
  lastCompletedAt: string;
}

export interface ProfileData {
  name: string;
  username: string;
  about?: string;
}

export interface RoadmapCard {
  title: string;
  slug: string;
  items?: string[];
  description?: string;
}

export interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface RoadmapSection {
  id: number;
  heading: string;
  tasks: TaskItem[];
}

export interface CardData {
  tasks: TaskItem[];
  sections?: RoadmapSection[];
}

export type CardTaskMap = Record<string, CardData>;
export type TaskCompletionHistory = Record<string, DailyTaskProgress>;

export const STORAGE_KEY = "taskList";
export const PROFILE_STORAGE_KEY = "profileData";
export const STORAGE_ROADMAP_KEY = "roadmapCards";
export const STORAGE_CARD_TASKS_KEY = "roadmapCardTasks";
export const STORAGE_TASK_HISTORY_KEY = "taskCompletionHistory";
export const STORAGE_HIDDEN_ROADMAP_SLUGS_KEY = "hiddenRoadmapSlugs";

import { defaultFrontendCardData } from "./defaultFrontend";
import { defaultBackendCardData } from "./defaultBackend";
import { defaultMachineLearningCardData } from "./defaultMachineLearning";
import { defaultOtherRoadmapCards, defaultOtherRoadmapsData } from "./defaultOtherRoadmaps";
import { saveUserData } from "./api/user";

const isClient = typeof window !== "undefined";

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Background sync to database helper
export async function syncToDatabase() {
  if (!isClient) return;

  const profileStr = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  const token = window.localStorage.getItem("authToken");
  if (!profileStr || !token) return;

  try {
    const profile = JSON.parse(profileStr);
    if (!profile.username) return;

    const username = profile.username;
    const name = profile.name;
    const about = profile.about || "";
    
    const tasksStr = window.localStorage.getItem(STORAGE_KEY);
    const tasks = tasksStr ? JSON.parse(tasksStr) : [];

    const roadmapCardsStr = window.localStorage.getItem(STORAGE_ROADMAP_KEY);
    const roadmapCards = roadmapCardsStr ? JSON.parse(roadmapCardsStr) : [];

    const roadmapCardTasksStr = window.localStorage.getItem(STORAGE_CARD_TASKS_KEY);
    const roadmapCardTasks = roadmapCardTasksStr ? JSON.parse(roadmapCardTasksStr) : {};

    const taskHistoryStr = window.localStorage.getItem(STORAGE_TASK_HISTORY_KEY);
    const taskCompletionHistory = taskHistoryStr ? JSON.parse(taskHistoryStr) : {};

    await saveUserData(token, {
      username,
      name,
      about,
      tasks,
      roadmapCards,
      roadmapCardTasks,
      taskCompletionHistory
    });
  } catch (e) {
    console.error("Database synchronization failed:", e);
  }
}

// Task storage helpers
export function loadStoredTasks(): Task[] {
  if (!isClient) return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveStoredTasks(tasks: Task[]): void {
  if (!isClient) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    syncToDatabase();
  } catch (e) {
    console.error("Failed to save tasks to localStorage", e);
  }
}

// Profile storage helpers
export function loadStoredProfile(): ProfileData | null {
  if (!isClient) return null;
  try {
    const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveProfileData(data: ProfileData): void {
  if (!isClient) return;
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
    syncToDatabase();
  } catch (e) {
    console.error("Failed to save profile to localStorage", e);
  }
}

// Roadmap Cards storage helpers
export function loadRoadmapCards(): RoadmapCard[] {
  if (!isClient) return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_ROADMAP_KEY);
    let cards: RoadmapCard[] = stored ? JSON.parse(stored) : [];
    let updated = false;

    const hasFrontend = cards.some((c) => c.slug === "frontend");
    if (!hasFrontend) {
      const defaultFrontendCard: RoadmapCard = {
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
      };
      cards = [defaultFrontendCard, ...cards];
      updated = true;
    }

    const hasBackend = cards.some((c) => c.slug === "backend");
    if (!hasBackend) {
      const defaultBackendCard: RoadmapCard = {
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
      };
      cards = [defaultBackendCard, ...cards];
      updated = true;
    }

    const mlIndex = cards.findIndex((c) => c.slug === "machin-learning");
    if (mlIndex === -1) {
      const defaultMLCard: RoadmapCard = {
        title: "Machine Learning",
        slug: "machin-learning",
        description: "For AI and ML",
        items: [
          "Python Basics", "Mathematics for Machine Learning", "Python Libraries",
          "Data Preprocessing", "Exploratory Data Analysis (EDA)", "Supervised Machine Learning (Regression)",
          "Supervised Machine Learning (Classification)", "Unsupervised Learning", "Model Evaluation & Optimization",
          "Ensemble Learning", "Deep Learning Fundamentals", "TensorFlow & Keras", "PyTorch",
          "Computer Vision Basics", "Computer Vision (CNN & Object Detection)", "Natural Language Processing (NLP)",
          "Time Series Analysis", "Reinforcement Learning", "Generative AI", "MLOps",
          "Deployment", "Databases", "Big Data", "Cloud for ML", "Explainable AI & Production ML",
          "Software Engineering for ML"
        ]
      };
      cards = [defaultMLCard, ...cards];
      updated = true;
    } else if (!cards[mlIndex].items || cards[mlIndex].items.length < 26) {
      cards[mlIndex].items = [
        "Python Basics", "Mathematics for Machine Learning", "Python Libraries",
        "Data Preprocessing", "Exploratory Data Analysis (EDA)", "Supervised Machine Learning (Regression)",
        "Supervised Machine Learning (Classification)", "Unsupervised Learning", "Model Evaluation & Optimization",
        "Ensemble Learning", "Deep Learning Fundamentals", "TensorFlow & Keras", "PyTorch",
        "Computer Vision Basics", "Computer Vision (CNN & Object Detection)", "Natural Language Processing (NLP)",
        "Time Series Analysis", "Reinforcement Learning", "Generative AI", "MLOps",
        "Deployment", "Databases", "Big Data", "Cloud for ML", "Explainable AI & Production ML",
        "Software Engineering for ML"
      ];
      updated = true;
    }

    defaultOtherRoadmapCards.forEach((otherCard) => {
      const idx = cards.findIndex((c) => c.slug === otherCard.slug);
      if (idx === -1) {
        cards = [...cards, otherCard];
        updated = true;
      } else if (!cards[idx].items || cards[idx].items.length === 0) {
        cards[idx].items = otherCard.items;
        updated = true;
      }
    });

    if (updated) {
      window.localStorage.setItem(STORAGE_ROADMAP_KEY, JSON.stringify(cards));
    }
    return cards;
  } catch {
    return [];
  }
}

export function saveRoadmapCards(cards: RoadmapCard[]): void {
  if (!isClient) return;
  try {
    window.localStorage.setItem(STORAGE_ROADMAP_KEY, JSON.stringify(cards));
    syncToDatabase();
  } catch (e) {
    console.error("Failed to save roadmap cards to localStorage", e);
  }
}

export function loadHiddenRoadmapSlugs(): string[] {
  if (!isClient) return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_HIDDEN_ROADMAP_SLUGS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveHiddenRoadmapSlugs(slugs: string[]): void {
  if (!isClient) return;
  try {
    window.localStorage.setItem(STORAGE_HIDDEN_ROADMAP_SLUGS_KEY, JSON.stringify(slugs));
    syncToDatabase();
  } catch (e) {
    console.error("Failed to save hidden roadmap slugs to localStorage", e);
  }
}

// Card Tasks storage helpers
export function loadCardTasks(): CardTaskMap {
  if (!isClient) return {};
  try {
    const stored = window.localStorage.getItem(STORAGE_CARD_TASKS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveCardTasks(value: CardTaskMap): void {
  if (!isClient) return;
  try {
    window.localStorage.setItem(STORAGE_CARD_TASKS_KEY, JSON.stringify(value));
    syncToDatabase();
  } catch (e) {
    console.error("Failed to save card tasks to localStorage", e);
  }
}

export function loadCardDataForSlug(slug: string): CardData {
  const all = loadCardTasks();
  if (!all || typeof all !== "object") {
    if (slug === "frontend") return defaultFrontendCardData;
    if (slug === "backend") return defaultBackendCardData;
    if (slug === "machin-learning") return defaultMachineLearningCardData;
    if (defaultOtherRoadmapsData[slug]) return defaultOtherRoadmapsData[slug];
    return { tasks: [] };
  }
  const cardData = all[slug];
  const otherSectionsCount = defaultOtherRoadmapsData[slug]?.sections?.length || 0;
  if (
    !cardData ||
    typeof cardData !== "object" ||
    !cardData.sections ||
    cardData.sections.length === 0 ||
    (slug === "frontend" && cardData.sections.length < 25) ||
    (slug === "backend" && cardData.sections.length < 26) ||
    (slug === "machin-learning" && cardData.sections.length < 26) ||
    (otherSectionsCount > 0 && cardData.sections.length < otherSectionsCount)
  ) {
    if (slug === "frontend") {
      all[slug] = defaultFrontendCardData;
      saveCardTasks(all);
      return defaultFrontendCardData;
    }
    if (slug === "backend") {
      all[slug] = defaultBackendCardData;
      saveCardTasks(all);
      return defaultBackendCardData;
    }
    if (slug === "machin-learning") {
      all[slug] = defaultMachineLearningCardData;
      saveCardTasks(all);
      return defaultMachineLearningCardData;
    }
    if (defaultOtherRoadmapsData[slug]) {
      const data = defaultOtherRoadmapsData[slug];
      all[slug] = data;
      saveCardTasks(all);
      return data;
    }
    return cardData || { tasks: [] };
  }
  return cardData;
}

export function saveCardDataForSlug(slug: string, data: CardData): void {
  const all = loadCardTasks();
  all[slug] = data;
  saveCardTasks(all);
}

export function saveTasksForSlug(slug: string, tasks: TaskItem[]): void {
  saveCardDataForSlug(slug, { tasks });
}

export function loadTaskCompletionHistory(): TaskCompletionHistory {
  if (!isClient) return {};
  try {
    const stored = window.localStorage.getItem(STORAGE_TASK_HISTORY_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveTaskCompletionHistory(history: TaskCompletionHistory): void {
  if (!isClient) return;
  try {
    window.localStorage.setItem(STORAGE_TASK_HISTORY_KEY, JSON.stringify(history));
    syncToDatabase();
  } catch (e) {
    console.error("Failed to save task completion history", e);
  }
}

export function recordTaskCompletion(params: {
  taskId: number;
  taskTitle: string;
  totalTasks: number;
  roadmapSlug?: string;
  roadmapTitle?: string;
  sectionHeading?: string;
  completedAt?: Date;
}): void {
  if (!isClient) return;

  const completedAt = params.completedAt ?? new Date();
  const dateKey = getLocalDateKey(completedAt);
  const history = loadTaskCompletionHistory();
  const day = history[dateKey] ?? {
    date: dateKey,
    completedCount: 0,
    totalTasks: params.totalTasks,
    records: [],
    lastCompletedAt: completedAt.toISOString(),
  };

  const recordKey = `${params.roadmapSlug ?? "task"}:${params.taskId}`;
  const existingRecord = day.records.find((record) => record.key === recordKey);

  if (!existingRecord) {
    day.records = [
      ...day.records,
      {
        key: recordKey,
        taskId: params.taskId,
        taskTitle: params.taskTitle,
        roadmapSlug: params.roadmapSlug,
        roadmapTitle: params.roadmapTitle,
        sectionHeading: params.sectionHeading,
        completedAt: completedAt.toISOString(),
      },
    ];
  }

  day.completedCount = day.records.length;
  day.totalTasks = Math.max(day.totalTasks, params.totalTasks);
  day.lastCompletedAt = completedAt.toISOString();

  history[dateKey] = day;
  saveTaskCompletionHistory(history);
}
