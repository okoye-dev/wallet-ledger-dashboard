import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SidebarItem {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", active: true },
  { label: "Transactions" },
  { label: "Reports" },
  { label: "Settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile backdrop - always present for smooth animation */}
      <div
        className={cn(
          "fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ease-in-out",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          // Base styles - positioned below header
          "fixed lg:top-4 top-header z-[99] left-0 h-[calc(100vh-var(--header-height))] w-64 bg-surface lg:shadow-lg transition-all",
          // Mobile: slide in/out animation
          "transform duration-300 ease-in-out",
          // Desktop: always visible, static positioning
          "lg:fixed lg:transform-none lg:h-full",
          // Mobile: hidden by default, slide in when open
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              return (
                <Button
                  key={item.label}
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-9 transition-colors rounded-2xl text-[10px] xs:text-[12px] md:text-sm",
                    item.active
                      ? "bg-button-green/15 text-button-green hover:bg-button-green/20"
                      : "text-text-green hover:bg-hover-text-green/10 hover:text-hover-text-green"
                  )}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export { Sidebar };
