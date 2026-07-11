"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  loadStoredProfile as loadProfileData,
  saveProfileData,
} from "@/app/lib/storage";
import { login, signup } from "@/app/lib/api/auth";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import Card from "@/app/components/ui/Card";

const DEFAULT_ABOUT =
  "John is a product-focused developer who builds delightful user experiences. He enjoys working on full-stack projects, learning new technologies, and contributing to open-source. Contact at john@example.com.";

export default function ProfilePage(): React.ReactElement {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  
  // Login status state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Stored states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");

  // Form draft states
  const [draftName, setDraftName] = useState("");
  const [draftUsername, setDraftUsername] = useState("");
  const [draftAbout, setDraftAbout] = useState("");
  
  // Authentication form states
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [authName, setAuthName] = useState("");
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authAbout, setAuthAbout] = useState("");
  
  // Validation error state
  const [validationError, setValidationError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      const clickedInsideMenu = menuRef.current && menuRef.current.contains(target);
      const clickedInsideWrapper = wrapperRef.current && wrapperRef.current.contains(target);
      if (!clickedInsideMenu && !clickedInsideWrapper) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const loadLocalProfile = () => {
    const profileData = loadProfileData();
    requestAnimationFrame(() => {
      if (profileData && profileData.username) {
        setName(profileData.name);
        setUsername(profileData.username);
        setAbout(profileData.about ?? DEFAULT_ABOUT);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    loadLocalProfile();
    window.addEventListener("localstorage-sync", loadLocalProfile);
    return () => window.removeEventListener("localstorage-sync", loadLocalProfile);
  }, []);

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  const handleChoose = () => {
    inputRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(url);
    setMenuOpen(false);
  };

  const handleRemove = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
      setImageSrc(null);
    }
    setMenuOpen(false);
  };

  const handleSave = () => {
    const trimmedName = draftName.trim();
    const trimmedUsername = draftUsername.trim().toLowerCase();
    const trimmedAbout = draftAbout.trim();

    if (!trimmedName) {
      setValidationError("Name cannot be empty.");
      return;
    }

    if (!trimmedUsername) {
      setValidationError("Username cannot be empty.");
      return;
    }

    // Validate username format
    const usernameRegex = /^[a-z0-9_-]+$/;
    if (!usernameRegex.test(trimmedUsername)) {
      setValidationError("Username can only contain lowercase letters, numbers, underscores, or hyphens (no spaces).");
      return;
    }

    // Unique/reserved usernames validation
    const reservedUsernames = ["admin", "system", "root", "null", "undefined", "user", "profile"];
    if (reservedUsernames.includes(trimmedUsername)) {
      setValidationError(`Username "@${trimmedUsername}" is reserved. Please pick another one.`);
      return;
    }

    if (trimmedAbout.length > 200) {
      setValidationError("About section must be 200 characters or less.");
      return;
    }

    // Username changes are not persisted by the current backend flow.
    if (trimmedUsername !== username) {
      setValidationError("Username changes are not supported from this screen. Sign up with the new username instead.");
      return;
    }

    setValidationError(null);
    setName(trimmedName);
    setAbout(trimmedAbout);

    saveProfileData({
      name: trimmedName,
      username: trimmedUsername,
      about: trimmedAbout,
    });
    setEditing(false);
    window.dispatchEvent(new Event("localstorage-sync"));
  };

  const handleStartEditing = () => {
    setDraftName(name);
    setDraftUsername(username);
    setDraftAbout(about);
    setValidationError(null);
    setEditing(true);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const enteredName = authName.trim();
    const enteredUsername = authUsername.trim().toLowerCase();
    const enteredAbout = authAbout.trim();

    if (isLoginTab) {
      if (!enteredUsername || !authPassword) {
        setAuthError("Username and Password are required.");
        return;
      }
    } else {
      if (!enteredName || !enteredUsername || !authPassword) {
        setAuthError("Name, Username, and Password are required.");
        return;
      }
    }

    const usernameRegex = /^[a-z0-9_-]+$/;
    if (!usernameRegex.test(enteredUsername)) {
      setAuthError("Username can only contain letters, numbers, underscores, or hyphens (no spaces).");
      return;
    }

    if (!isLoginTab && authPassword.length < 6) {
      setAuthError("Password must be at least 6 characters long.");
      return;
    }

    if (!isLoginTab && enteredAbout.length > 200) {
      setAuthError("About section must be 200 characters or less.");
      return;
    }

    try {
      setLoading(true);
      if (isLoginTab) {
        const data = await login(enteredUsername, authPassword);

        // Successfully logged in! Save remote values and token to local storage
        window.localStorage.setItem("authToken", data.token);
        window.localStorage.setItem("profileData", JSON.stringify({
          name: data.user.name,
          username: data.user.username,
          about: data.user.about || ""
        }));
        if (data.user.tasks) {
          window.localStorage.setItem("taskList", JSON.stringify(data.user.tasks));
        }
        if (data.user.roadmapCards) {
          window.localStorage.setItem("roadmapCards", JSON.stringify(data.user.roadmapCards));
        }
        if (data.user.roadmapCardTasks) {
          window.localStorage.setItem("roadmapCardTasks", JSON.stringify(data.user.roadmapCardTasks));
        }
        if (data.user.taskCompletionHistory) {
          window.localStorage.setItem("taskCompletionHistory", JSON.stringify(data.user.taskCompletionHistory));
        }

        // Clear auth inputs
        setAuthName("");
        setAuthUsername("");
        setAuthPassword("");
        setAuthAbout("");
        
        // Trigger page refresh
        window.dispatchEvent(new Event("localstorage-sync"));
      } else {
        const data = await signup(enteredUsername, enteredName, authPassword, enteredAbout);

        // Save local storage token and profile
        window.localStorage.setItem("authToken", data.token);
        window.localStorage.setItem("profileData", JSON.stringify({
          name: data.user.name,
          username: data.user.username,
          about: data.user.about || ""
        }));
        window.localStorage.setItem("taskList", JSON.stringify([]));
        window.localStorage.setItem("roadmapCards", JSON.stringify([]));
        window.localStorage.setItem("roadmapCardTasks", JSON.stringify({}));
        window.localStorage.setItem("taskCompletionHistory", JSON.stringify({}));

        // Clear auth inputs
        setAuthName("");
        setAuthUsername("");
        setAuthPassword("");
        setAuthAbout("");

        // Trigger page refresh
        window.dispatchEvent(new Event("localstorage-sync"));
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setAuthError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // RENDER ACCESS FORM IF NOT LOGGED IN
  if (!isLoggedIn) {
    return (
      <div className="p-8 min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Card className="w-full max-w-md p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-white">TaskComplet Profile</h2>
            <p className="text-sm text-zinc-400 mt-1">Please authenticate to manage your tasks</p>
          </div>

          {/* Toggle Tab Row */}
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1 mb-6">
            <button
              onClick={() => {
                setIsLoginTab(true);
                setAuthError(null);
              }}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                isLoginTab
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setIsLoginTab(false);
                setAuthError(null);
              }}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                !isLoginTab
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {/* Name input only shown in SIGNUP mode */}
            {!isLoginTab && (
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Name
                </label>
                <Input
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="Suraj Kumar"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Username
              </label>
              <Input
                value={authUsername}
                onChange={(e) => setAuthUsername(e.target.value)}
                prefixText="@"
                placeholder="username"
                required
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                Contains only lowercase letters, numbers, underscores, or hyphens.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <Input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••"
                required
              />
              {!isLoginTab && (
                <p className="text-[10px] text-zinc-500 mt-1">
                  Password must be at least 6 characters long.
                </p>
              )}
            </div>

            {/* About input only shown in SIGNUP mode */}
            {!isLoginTab && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    About
                  </label>
                  <span className={`text-[10px] ${authAbout.length > 200 ? "text-red-400" : "text-zinc-500"}`}>
                    {authAbout.length}/200
                  </span>
                </div>
                <Textarea
                  value={authAbout}
                  onChange={(e) => setAuthAbout(e.target.value)}
                  placeholder="Tell us about yourself..."
                  maxLength={200}
                />
              </div>
            )}

            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-lg text-xs text-red-400 font-medium">
                {authError}
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full mt-2"
            >
              {isLoginTab ? "Access Account" : "Register Profile"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // RENDER PROFILE DETAILS IF LOGGED IN
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-transparent rounded shadow p-6">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column: Avatar & Edit State Button */}
          <div className="flex flex-col items-center md:w-64 shrink-0">
            <div className="relative" ref={wrapperRef}>
              <div
                onClick={() => setMenuOpen((s) => !s)}
                className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-200 cursor-pointer overflow-hidden border border-zinc-800"
                aria-label="Profile image"
              >
                {imageSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={imageSrc} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>U</span>
                )}
              </div>

              {menuOpen && (
                <div ref={menuRef} className="absolute left-0 mt-2 w-40 bg-zinc-900 text-white rounded border border-zinc-850 shadow-lg z-50">
                  <button
                    onClick={handleChoose}
                    className="w-full text-left px-3 py-2 hover:bg-zinc-800 text-sm"
                  >
                    Add Image
                  </button>
                  <button
                    onClick={handleRemove}
                    className="w-full text-left px-3 py-2 hover:bg-zinc-800 text-sm text-red-400"
                  >
                    Remove Image
                  </button>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </div>

            {/* Display Mode metadata under avatar */}
            {!editing && (
              <div className="text-center mt-4 space-y-2">
                <h2 className="text-xl font-semibold text-white">{name}</h2>
                <p className="text-sm text-zinc-400">@{username}</p>
                <div className="pt-2">
                  <Button
                    onClick={handleStartEditing}
                    variant="secondary"
                    size="sm"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Display Details OR Edit Form */}
          <div className="flex-1">
            {!editing ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">About</h3>
                  <p className="text-zinc-400 mt-3 text-sm leading-relaxed whitespace-pre-wrap">{about}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-xl">
                <h3 className="text-lg font-medium text-white border-b border-zinc-800 pb-2 mb-4">Edit Profile</h3>
                
                {/* Form fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Name</label>
                    <Input
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Username</label>
                    <Input
                      value={draftUsername}
                      onChange={(e) => setDraftUsername(e.target.value)}
                      prefixText="@"
                      placeholder="username"
                    />
                    <p className="text-[11px] text-zinc-500 mt-1">Username must be unique and contain no spaces.</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">About</label>
                      <span className={`text-xs ${draftAbout.length > 200 ? "text-red-400" : "text-zinc-500"}`}>
                        {draftAbout.length}/200
                      </span>
                    </div>
                    <Textarea
                      value={draftAbout}
                      onChange={(e) => setDraftAbout(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={5}
                      maxLength={200}
                    />
                  </div>
                </div>

                {/* Validation Error Message */}
                {validationError && (
                  <div className="p-3 bg-red-950/40 border border-red-900/50 rounded text-xs text-red-400 font-medium">
                    {validationError}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 justify-end">
                  <Button
                    onClick={handleSave}
                    size="sm"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditing(false)}
                    variant="secondary"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
