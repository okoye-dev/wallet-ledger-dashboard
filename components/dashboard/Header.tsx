import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/theme-toggle";
import { FinTrack, MenuBars, Search, Windows } from "@/components/icons";
import Link from "next/link";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="h-header bg-surface flex sticky top-0 z-50 justify-between items-center px-4 md:px-6">
      <section className="flex items-center gap-1.5 xs:gap-2 md:gap-4">
        <MenuBars
          onClick={onMenuToggle}
          className="w-3.5 h-3.5 xs:w-4 xs:h-4 md:w-5 md:h-5"
        />

        <Link href="/" className="scale-[0.65] xs:scale-75 md:scale-100">
          <FinTrack />
        </Link>
      </section>

      <section className="flex items-center gap-[8px] md:gap-[28px] [&>*]:scale-[0.65] [&>*]:xs:scale-75 [&>*]:md:scale-100">
        <ThemeToggle />
        <Search />
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
