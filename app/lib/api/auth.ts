export interface AuthUserResponse {
  token: string;
  user: {
    name: string;
    username: string;
    about?: string;
    tasks?: any[];
    roadmapCards?: any[];
    roadmapCardTasks?: Record<string, any>;
    taskCompletionHistory?: Record<string, any>;
  };
}

export async function login(username: string, password: string): Promise<AuthUserResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Authentication failed.");
  }
  return data;
}

export async function signup(
  username: string,
  name: string,
  password: string,
  about: string
): Promise<AuthUserResponse> {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, name, password, about }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to register profile.");
  }
  return data;
}
