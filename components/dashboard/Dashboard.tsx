"use client";

import { useState } from "react";
import {
  Header,
  Sidebar,
  WalletHeader,
  SummaryCards,
  TransactionTable,
} from "@/components/dashboard";
import { mockTransactions, mockSummary } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main content area */}
      <section className="w-full">
        <Header onMenuToggle={toggleSidebar} />

        <main
          className={cn(
            "min-h-[calc(100vh-4rem)] px-6 py-6 space-y-10",
            sidebarOpen ? "lg:pl-64" : "lg:pl-6",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <WalletHeader />
          <SummaryCards summary={mockSummary} />
          <TransactionTable transactions={mockTransactions} />
        </main>
      </section>
    </div>
  );
};

export { Dashboard };
