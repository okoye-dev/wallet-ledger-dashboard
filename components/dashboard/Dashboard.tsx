"use client";

import { useState } from "react";
import {
  Header,
  Sidebar,
  WalletHeader,
  SummaryCards,
  TransactionTable,
} from "@/components/dashboard";
import { TransactionsContent } from "@/components/dashboard/TransactionsContent";
import { ErrorBoundary } from "@/components/dashboard/error/ErrorBoundary";
import { useDashboardSummary, useTransactions } from "@/hooks/api/useDashboard";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useDashboardSummary();

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTransactions();

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
            <SummaryCards
              summary={summary}
              isLoading={summaryLoading}
              error={summaryError}
            />
            <TransactionTable
              transactions={transactionsData?.transactions || []}
              isLoading={transactionsLoading}
              error={transactionsError}
              onAddTransaction={handleAddTransaction}
            />
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex bg-background">
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
