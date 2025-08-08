import { useEffect, useCallback } from "react";

interface UseSearchKeyboardProps {
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  onClearSearch: () => void;
}

export const useSearchKeyboard = ({
  onOpenSearch,
  onCloseSearch,
  onClearSearch,
}: UseSearchKeyboardProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Escape key to close search
      if (event.key === "Escape") {
        onCloseSearch();
        onClearSearch();
      }

      // Ctrl/Cmd + K to open search
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        onOpenSearch();
      }
    },
    [onOpenSearch, onCloseSearch, onClearSearch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    handleKeyDown,
  };
};
