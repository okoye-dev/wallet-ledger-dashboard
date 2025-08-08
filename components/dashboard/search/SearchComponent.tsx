"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { useSearch } from "@/hooks/useSearch";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSearchKeyboard } from "@/hooks/useSearchKeyboard";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import { Transaction } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface SearchComponentProps {
  onTransactionSelect?: (transaction: Transaction) => void;
  className?: string;
}

export interface SearchComponentRef {
  openSearch: () => void;
  closeSearch: () => void;
}

export const SearchComponent = forwardRef<
  SearchComponentRef,
  SearchComponentProps
>(({ onTransactionSelect, className }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Search functionality
  const { query, setQuery, clearSearch, searchResults, hasQuery, isLoading } =
    useSearch({ maxResults: 8 });

  // Search UI state management
  const {
    isSearchExpanded,
    showSearchResults,
    handleSearchFocus,
    handleSearchBlur,
    handleTransactionSelect,
    handleSearchClear,
    handleSearchClose,
    expandSearch,
    collapseSearch,
  } = useHeaderSearch({ onTransactionSelect });

  // Expose methods to parent components
  useImperativeHandle(
    ref,
    () => ({
      openSearch: expandSearch,
      closeSearch: collapseSearch,
    }),
    [expandSearch, collapseSearch]
  );

  // Click outside to close
  useClickOutside({
    ref: containerRef,
    onClickOutside: collapseSearch,
    enabled: isSearchExpanded,
  });

  // Keyboard shortcuts
  useSearchKeyboard({
    onOpenSearch: expandSearch,
    onCloseSearch: collapseSearch,
    onClearSearch: () => {
      clearSearch();
      handleSearchClear();
    },
  });

  // Combined clear handler
  const handleClear = () => {
    clearSearch();
    handleSearchClear();
  };

  // Show results when expanded and has query or loading
  const shouldShowResults = showSearchResults && (hasQuery || isLoading);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <SearchInput
        value={query}
        onChange={setQuery}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        onClear={handleClear}
        isExpanded={isSearchExpanded}
        placeholder="Search transactions... (⌘K)"
      />

      {shouldShowResults && (
        <SearchResults
          query={query}
          transactions={searchResults}
          isLoading={isLoading}
          onTransactionClick={handleTransactionSelect}
          onClose={handleSearchClose}
        />
      )}
    </div>
  );
});

SearchComponent.displayName = "SearchComponent";
