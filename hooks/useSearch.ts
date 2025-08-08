import { useState, useMemo, useEffect } from "react";
import { Transaction } from "@/types/dashboard";
import { useTransactions } from "@/hooks/api/useDashboard";

interface UseSearchProps {
  debounceMs?: number;
  maxResults?: number;
}

export const useSearch = ({
  debounceMs = 300,
  maxResults = 10,
}: UseSearchProps = {}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    if (query.trim()) {
      setIsSearching(true);
    }

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Get all transactions for searching
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useTransactions({
      limit: 100, // Get more transactions for better search results
    });

  // Filter transactions based on search query
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim() || !transactionsData?.transactions) {
      return [];
    }

    const searchTerm = debouncedQuery.toLowerCase();

    return transactionsData.transactions
      .filter((transaction: Transaction) => {
        return (
          transaction.remark.toLowerCase().includes(searchTerm) ||
          transaction.type.toLowerCase().includes(searchTerm) ||
          transaction.currency.toLowerCase().includes(searchTerm) ||
          transaction.amount.toString().includes(searchTerm) ||
          transaction.date.includes(searchTerm)
        );
      })
      .slice(0, maxResults); // Limit results
  }, [debouncedQuery, transactionsData?.transactions, maxResults]);

  // Search state management
  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    setIsSearching(false);
  };

  const isLoading = isSearching || isLoadingTransactions;
  const hasResults = searchResults.length > 0;
  const hasQuery = debouncedQuery.trim().length > 0;

  return {
    // Search state
    query,
    debouncedQuery,
    setQuery,
    clearSearch,

    // Results
    searchResults,
    hasResults,
    hasQuery,

    // Loading states
    isLoading,
    isSearching,
    isLoadingTransactions,
  };
};
