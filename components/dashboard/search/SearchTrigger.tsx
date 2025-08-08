"use client";

import { Search } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SearchTriggerProps {
  onClick?: () => void;
  className?: string;
}

export const SearchTrigger = ({ onClick, className }: SearchTriggerProps) => {
  return (
    <Search
      onClick={onClick}
      className={cn("transition-all duration-500", className)}
      variant="ghost"
    />
  );
};
