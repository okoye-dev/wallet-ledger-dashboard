import { Search, Grid3x3, Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/theme-toggle";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="h-header bg-surface border-b border-card-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left section - Logo and Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-primary-foreground rounded-sm" />
            </div>
            <span className="font-semibold text-lg text-foreground hidden sm:block">
              FinTrack
            </span>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 bg-surface-muted border-input-border focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Right section - Actions and Profile */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Grid3x3 className="h-5 w-5" />
          </Button>

          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center bg-danger text-danger-foreground text-xs">
              3
            </Badge>
          </Button>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                JD
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
