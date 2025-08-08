import { useState, useCallback, useRef, useEffect } from "react";
import { Transaction } from "@/types/dashboard";

export const useDashboardActions = () => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearSelectedTransaction = useCallback(() => {
    setSelectedTransactionId(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleTransactionSelect = useCallback((transaction: Transaction) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

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

    // Auto-clear the selection after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setSelectedTransactionId(null);
      timeoutRef.current = null;
    }, 3000);
  }, []);

  const handleAddTransaction = useCallback(() => {
    // This would typically open a modal or navigate to an add transaction page
    console.log("Add transaction clicked");
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    selectedTransactionId,
    handleTransactionSelect,
    clearSelectedTransaction,
    handleAddTransaction,
  };
};
