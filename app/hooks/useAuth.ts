import { useState, useEffect } from "react";
import { loadStoredProfile } from "@/app/lib/storage";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<{ name: string; username: string; about?: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const storedProfile = loadStoredProfile();
        const storedToken = window.localStorage.getItem("authToken");
        if (storedProfile?.username && storedToken) {
          setProfile(storedProfile);
          setToken(storedToken);
          setIsLoggedIn(true);
        } else {
          setProfile(null);
          setToken(null);
          setIsLoggedIn(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
    window.addEventListener("localstorage-sync", checkAuth);
    return () => window.removeEventListener("localstorage-sync", checkAuth);
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("authToken");
      window.localStorage.removeItem("profileData");
      window.localStorage.removeItem("taskList");
      window.localStorage.removeItem("roadmapCards");
      window.localStorage.removeItem("roadmapCardTasks");
      window.localStorage.removeItem("taskCompletionHistory");
      window.dispatchEvent(new Event("localstorage-sync"));
    }
  };

  return { isLoggedIn, profile, token, loading, logout };
}
