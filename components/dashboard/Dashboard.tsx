"use client";

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
import { useDashboardNavigation } from "@/hooks/useDashboardNavigation";
import { useDashboardActions } from "@/hooks/useDashboardActions";
import { Transaction } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  // Navigation state
  const {
    sidebarOpen,
    activeTab,
    toggleSidebar,
    closeSidebar,
    handleBackToOverview,
    setActiveTab,
    handleTransactionSelectWithNavigation,
  } = useDashboardNavigation();

  // Dashboard actions
  const {
    selectedTransactionId,
    handleTransactionSelect,
    handleAddTransaction,
  } = useDashboardActions();

  // Data fetching
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

  // Combined transaction select handler
  const onTransactionSelect = (transaction: Transaction) => {
    handleTransactionSelectWithNavigation(transaction, handleTransactionSelect);
  };

  // Navigate to transactions table
  const navigateToTransactions = () => {
    setActiveTab("transactions");
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
            <div data-transaction-table>
              <TransactionTable
                transactions={transactionsData?.transactions || []}
                isLoading={transactionsLoading}
                error={transactionsError}
                onAddTransaction={handleAddTransaction}
                selectedTransactionId={selectedTransactionId}
              />
            </div>
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen lg:px-4 flex bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <section className="w-full">
          <Header
            onMenuToggle={toggleSidebar}
            onTransactionSelect={onTransactionSelect}
            onCloseSidebar={closeSidebar}
            onNavigateToTransactions={navigateToTransactions}
          />

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
