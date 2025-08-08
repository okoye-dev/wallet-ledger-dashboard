"use client";

import { useState, useEffect } from "react";
import {
  Header,
  Sidebar,
  WalletHeader,
  SummaryCards,
  TransactionTable,
} from "@/components/dashboard";
import { TransactionsContent } from "@/components/dashboard/TransactionsContent";
import { mockTransactions, mockSummary } from "@/data/mockData";
import { ErrorBoundary } from "@/components/dashboard/error/ErrorBoundary";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const handleBackToOverview = () => setActiveTab("overview");

  const handleAddTransaction = () => {
    // This would typically open a modal or navigate to an add transaction page
    console.log("Add transaction clicked");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "transactions":
        return <TransactionsContent onBackToOverview={handleBackToOverview} />;
      case "overview":
      default:
        return (
          <>
            <SummaryCards summary={mockSummary} isLoading={isLoading} />
            <TransactionTable
              transactions={mockTransactions}
              isLoading={isLoading}
              onAddTransaction={handleAddTransaction}
            />
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Main content area */}
        <section className="w-full">
          <Header onMenuToggle={toggleSidebar} />

          <main
            className={cn(
              "min-h-[calc(100vh-4rem)] px-4 md:px-6 py-6 space-y-6 md:space-y-10",
              sidebarOpen ? "lg:pl-64" : "lg:pl-6",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <WalletHeader activeTab={activeTab} onTabChange={setActiveTab} />
            {renderTabContent()}
          </main>
        </section>
      </div>
    </ErrorBoundary>
  );
};

export { Dashboard };
