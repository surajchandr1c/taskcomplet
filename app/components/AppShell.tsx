"use client";

import React, { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import DbSync from "./DbSync";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }): React.ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const closeSidebar = () => setIsSidebarOpen(false);

    window.addEventListener("resize", closeSidebar);
    return () => window.removeEventListener("resize", closeSidebar);
  }, []);

  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <main className="flex-1 flex flex-col min-h-screen bg-black">
        {children}
      </main>
    );
  }

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
