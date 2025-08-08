import { useState, useCallback } from "react";

export const useDashboardNavigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleBackToOverview = useCallback(() => {
    setActiveTab("overview");
  }, []);

  const switchToTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleTransactionSelectWithNavigation = useCallback(
    (transaction: any, onTransactionSelect: (transaction: any) => void) => {
      // Switch to overview tab if needed
      if (activeTab !== "overview") {
        setActiveTab("overview");
      }

      // Call the transaction select handler
      onTransactionSelect(transaction);
    },
    [activeTab]
  );

  return {
    sidebarOpen,
    activeTab,
    toggleSidebar,
    closeSidebar,
    handleBackToOverview,
    switchToTab,
    setActiveTab,
    handleTransactionSelectWithNavigation,
  };
};
