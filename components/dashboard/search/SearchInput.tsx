"use client";

import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  placeholder?: string;
  isExpanded?: boolean;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
  placeholder = "Search transactions...",
  isExpanded = false,
  className,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleFocus = () => {
    onFocus?.();
  };

  const handleBlur = () => {
    onBlur?.();
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "relative flex items-center transition-all duration-200 ease-in-out",
        isExpanded ? "w-64 md:w-80" : "w-8 md:w-10",
        className
      )}
    >
      {/* Search Icon */}
      <div
        className={cn(
          "absolute left-2 z-10 transition-all duration-200",
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={cn(
          "w-full transition-all duration-200 ease-in-out",
          "bg-background border border-border rounded-md",
          "text-sm text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          isExpanded
            ? "h-8 pl-8 pr-8 opacity-100 pointer-events-auto"
            : "h-0 p-0 opacity-0 pointer-events-none border-transparent"
        )}
      />

      {/* Clear Button */}
      {isExpanded && value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 h-6 w-6 p-0 hover:bg-muted"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
