"use client";

import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface AppShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AppShell({ children, title, subtitle }: AppShellProps) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--vault-bg)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: "220px" }}>
        <Topbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
