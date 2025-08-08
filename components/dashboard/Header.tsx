"use client";

import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/theme-toggle";
import { FinTrack, MenuBars, Windows } from "@/components/icons";
import { SearchComponent, SearchComponentRef } from "./search/SearchComponent";
import { SearchTrigger } from "./search/SearchTrigger";
import { Transaction } from "@/types/dashboard";
import Link from "next/link";

interface HeaderProps {
  onMenuToggle?: () => void;
  onTransactionSelect?: (transaction: Transaction) => void;
}

const Header = ({ onMenuToggle, onTransactionSelect }: HeaderProps) => {
  const desktopSearchRef = useRef<SearchComponentRef>(null);
  const mobileSearchRef = useRef<SearchComponentRef>(null);

  const handleSearchTriggerClick = () => {
    // Check screen size and trigger appropriate search
    const isMobile = window.innerWidth < 768; // md breakpoint
    if (isMobile) {
      mobileSearchRef.current?.openSearch();
    } else {
      desktopSearchRef.current?.openSearch();
    }
  };

  return (
    <header className="h-header bg-surface flex sticky top-0 z-50 justify-between items-center px-4 md:px-6">
      {/* Left section - Logo and Menu */}
      <section className="flex items-center gap-1.5 xs:gap-2 md:gap-4">
        <MenuBars
          onClick={onMenuToggle}
          className="w-3.5 h-3.5 xs:w-4 xs:h-4 md:w-5 md:h-5"
        />
        <Link href="/" className="scale-[0.65] xs:scale-75 md:scale-100">
          <FinTrack />
        </Link>
      </section>

      {/* Center section - Search (desktop) */}
      <section className="hidden md:flex flex-1 justify-center max-w-md mx-4">
        <SearchComponent
          ref={desktopSearchRef}
          onTransactionSelect={onTransactionSelect}
          className="w-full"
        />
      </section>

      {/* Right section - Actions and User */}
      <section className="flex items-center gap-[8px] md:gap-[28px] [&>*:not(.search-component)]:scale-[0.65] [&>*:not(.search-component)]:xs:scale-75 [&>*:not(.search-component)]:md:scale-100">
        {/* Mobile search - collapsed SearchComponent */}
        <div className="md:hidden search-component">
          <SearchComponent
            ref={mobileSearchRef}
            onTransactionSelect={onTransactionSelect}
          />
        </div>

        {/* Search trigger icon - visible on all screen sizes */}
        <SearchTrigger onClick={handleSearchTriggerClick} />

        <ThemeToggle />
        <Windows />

        <Avatar className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8">
          <AvatarImage src="/profile.png" />
          <AvatarFallback className="bg-primary text-primary-foreground text-[8px] xs:text-[10px] md:text-sm">
            JD
          </AvatarFallback>
        </Avatar>
      </section>
    </header>
  );
};

export { Header };
