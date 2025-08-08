"use client";

import { useRef, useState } from "react";
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
  onCloseSidebar?: () => void;
  onNavigateToTransactions?: () => void;
}

const Header = ({
  onMenuToggle,
  onTransactionSelect,
  onCloseSidebar,
  onNavigateToTransactions,
}: HeaderProps) => {
  const searchRef = useRef<SearchComponentRef>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchTriggerClick = () => {
    // Close sidebar first if it's open
    onCloseSidebar?.();
    setIsSearchOpen(true);
    searchRef.current?.openSearch();
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    searchRef.current?.closeSearch();
  };

  return (
    <>
      <header className="h-header bg-background flex sticky top-0 z-50 justify-center md:justify-center items-center px-4 md:px-6 lg:pl-2">
        {/* Left section - Logo and Menu */}
        <section className="absolute left-4 flex items-center xs:gap-2 md:gap-4">
          <MenuBars onClick={onMenuToggle} />
          <Link href="/" className="scale-[0.65] xs:scale-75 md:scale-100">
            <FinTrack />
          </Link>
        </section>

        <section className="absolute right-4 md:relative md:right-auto flex items-center gap-[8px] md:gap-[28px] [&>*]:scale-[0.65] [&>*]:xs:scale-75 [&>*]:md:scale-100">
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

      {/* Search */}
      <section
        className={`fixed top-0 left-1/2 w-full -translate-x-1/2 right-0 z-[60] transition-all duration-300 ease-out transform px-4 ${
          isSearchOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          paddingTop: "var(--header-height)", // Start below the header
        }}
      >
        <div className="max-w-2xl mx-auto">
          <SearchComponent
            ref={searchRef}
            onTransactionSelect={(transaction) => {
              onTransactionSelect?.(transaction);
              handleSearchClose();
            }}
            onClose={handleSearchClose}
            onCloseSidebar={onCloseSidebar}
            onNavigateToTransactions={onNavigateToTransactions}
            className="w-full"
          />
        </div>
      </section>

      {/* SearchBackdrop */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[55]"
          onClick={handleSearchClose}
        />
      )}
    </>
  );
};

export { Header };
