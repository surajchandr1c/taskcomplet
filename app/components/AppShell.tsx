"use client";

import React, { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import DbSync from "./DbSync";

export default function AppShell({ children }: { children: React.ReactNode }): React.ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const closeSidebar = () => setIsSidebarOpen(false);

    window.addEventListener("resize", closeSidebar);
    return () => window.removeEventListener("resize", closeSidebar);
  }, []);

  return (
    <>
      <DbSync />
      <NavBar onMenuClick={() => setIsSidebarOpen((open) => !open)} />
      <main className="flex-1 flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 md:ml-64">{children}</div>
      </main>
    </>
  );
}
