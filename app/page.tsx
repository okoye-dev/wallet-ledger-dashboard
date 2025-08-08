"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="relative font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Header onMenuToggle={toggleSidebar} />

      <Dashboard />
    </div>
  );
}
