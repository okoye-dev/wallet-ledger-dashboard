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
      {/* Mobile backdrop - only shows on small screens when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ease-in-out"
          onClick={onClose}
          style={{
            opacity: isOpen ? 1 : 0,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Base styles - positioned below header
          "fixed top-header left-0 z-40 h-[calc(100vh-var(--header-height))] w-64 bg-surface border-r border-card-border shadow-lg",
          // Mobile: slide in/out animation
          "transform transition-transform duration-300 ease-in-out",
          // Desktop: always visible, static positioning
          "lg:static lg:shadow-none lg:transform-none lg:h-full",
          // Mobile: hidden by default, slide in when open
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                return (
                  <Button
                    key={item.label}
                    variant={item.active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-9 transition-colors rounded-2xl",
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

          {/* User section at bottom */}
          <section className="p-4 border-t border-card-border">
            <h3 className="text-xs text-muted-foreground mb-2">John Doe</h3>
            <p className="text-xs text-muted-foreground">
              john.doe@fintrack.com
            </p>
          </section>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
