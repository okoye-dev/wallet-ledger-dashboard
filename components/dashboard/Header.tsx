import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/theme-toggle";
import { FinTrack, MenuBars, Search, Windows } from "@/components/icons";
import Link from "next/link";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="h-header bg-surface flex sticky top-0 z-50">
      <section className="flex absolute left-4 top-4 items-center gap-4">
        <MenuBars onClick={onMenuToggle} />

        <Link href="/">
          <FinTrack />
        </Link>
      </section>

      <div className="flex items-center w-full justify-center px-6 h-full">
        <section className="flex items-center gap-[28px]">
          <ThemeToggle />

          <Search />
          <Windows />
          <Avatar className="h-8 w-8">
            <AvatarImage src="/profile.png" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              JD
            </AvatarFallback>
          </Avatar>
        </section>
      </div>
    </header>
  );
};

export { Header };
