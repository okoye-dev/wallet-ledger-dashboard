import { useState, useCallback } from "react";
import { Transaction } from "@/types/dashboard";

export const useDashboardActions = () => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const handleTransactionSelect = useCallback((transaction: Transaction) => {
    // Highlight the selected transaction
    setSelectedTransactionId(transaction.id);

    // Scroll to transaction table section after a brief delay
    setTimeout(() => {
      const tableElement = document.querySelector("[data-transaction-table]");
      if (tableElement) {
        tableElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }, []);

  const clearSelectedTransaction = useCallback(() => {
    setSelectedTransactionId(null);
  }, []);

  const handleAddTransaction = useCallback(() => {
    // This would typically open a modal or navigate to an add transaction page
    console.log("Add transaction clicked");
  }, []);

  return {
    selectedTransactionId,
    handleTransactionSelect,
    clearSelectedTransaction,
    handleAddTransaction,
  };
};
