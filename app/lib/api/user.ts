export async function getUserData(token: string): Promise<any> {
  const res = await fetch("/api/user-data", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    throw new Error("Failed to fetch user data: invalid response.");
  }

  if (!res.ok) {
    throw new Error(data?.error || "Failed to fetch user data.");
  }
  return data;
}

export async function saveUserData(token: string, payload: {
  username: string;
  name: string;
  about: string;
  tasks: any[];
  roadmapCards: any[];
  roadmapCardTasks: Record<string, any>;
  taskCompletionHistory: Record<string, any>;
}): Promise<any> {
  const res = await fetch("/api/user-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    throw new Error("Failed to save user data: invalid response.");
  }

  if (!res.ok) {
    throw new Error(data?.error || "Failed to save user data.");
  }
  return data;
}
