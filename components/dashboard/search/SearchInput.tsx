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
        isExpanded ? "w-full" : "w-8 md:w-10",
        className
      )}
    >
      {/* Search Icon */}
      <div
        className={cn(
          "absolute left-3 z-10 transition-all duration-200",
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Search className="h-5 w-5 text-muted-foreground" />
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
          "bg-background border border-border rounded-lg shadow-lg",
          "text-base text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          isExpanded
            ? "h-12 pl-12 pr-12 opacity-100 pointer-events-auto"
            : "h-0 p-0 opacity-0 pointer-events-none border-transparent"
        )}
      />

      {/* Clear Button */}
      {isExpanded && value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-2 h-8 w-8 p-0 hover:bg-muted rounded-md"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
