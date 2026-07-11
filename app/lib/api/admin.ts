export async function adminLogin(password: string): Promise<any> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Admin authentication failed.");
  }
  return data;
}

export async function adminLogout(): Promise<any> {
  const res = await fetch("/api/admin/logout", {
    method: "POST",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Admin logout failed.");
  }
  return data;
}

export async function fetchAdminStats(): Promise<any> {
  const res = await fetch("/api/admin/stats");
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch admin stats.");
  }
  return data;
}

export async function fetchAdminUsers(): Promise<any[]> {
  const res = await fetch("/api/admin/users");
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch users list.");
  }
  return data.users || [];
}

export async function deleteAdminUser(username: string): Promise<any> {
  const res = await fetch(`/api/admin/users?username=${encodeURIComponent(username)}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to delete user.");
  }
  return data;
}
