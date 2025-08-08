import { useState, useCallback } from "react";
import { Transaction } from "@/types/dashboard";

interface UseHeaderSearchProps {
  onTransactionSelect?: (transaction: Transaction) => void;
}

export const useHeaderSearch = ({
  onTransactionSelect,
}: UseHeaderSearchProps = {}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchFocus = useCallback(() => {
    setIsSearchExpanded(true);
    setShowSearchResults(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    // Delay to allow clicks on results
    setTimeout(() => {
      setShowSearchResults(false);
    }, 150);
  }, []);

  const handleTransactionSelect = useCallback(
    (transaction: Transaction) => {
      // Close search UI
      setIsSearchExpanded(false);
      setShowSearchResults(false);

      // Handle transaction selection
      onTransactionSelect?.(transaction);
    },
    [onTransactionSelect]
  );

  const handleSearchClear = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  const handleSearchClose = useCallback(() => {
    setIsSearchExpanded(false);
    setShowSearchResults(false);
  }, []);

  const expandSearch = useCallback(() => {
    setIsSearchExpanded(true);
    setShowSearchResults(true);
  }, []);

  const collapseSearch = useCallback(() => {
    setIsSearchExpanded(false);
    setShowSearchResults(false);
  }, []);

  return {
    // State
    isSearchExpanded,
    showSearchResults,

    // Handlers
    handleSearchFocus,
    handleSearchBlur,
    handleTransactionSelect,
    handleSearchClear,
    handleSearchClose,

    // Actions
    expandSearch,
    collapseSearch,
  };
};
