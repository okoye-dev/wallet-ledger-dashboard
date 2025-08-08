"use client";

import { Search } from "@/components/icons";

interface SearchTriggerProps {
  onClick?: () => void;
  className?: string;
}

export const SearchTrigger = ({ onClick, className }: SearchTriggerProps) => {
  return <Search onClick={onClick} className={className} variant="ghost" />;
};
