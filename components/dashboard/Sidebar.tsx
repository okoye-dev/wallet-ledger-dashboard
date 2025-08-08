import {
  Home,
  CreditCard,
  BarChart3,
  Settings,
  FileText,
  Users,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href?: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: CreditCard, label: "Transactions" },
  { icon: FileText, label: "Reports" },
  { icon: Users, label: "Team" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
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
          // Base styles
          "fixed top-0 left-0 z-50 h-full w-64 bg-surface border-r border-card-border shadow-lg",
          // Mobile: slide in/out animation
          "transform transition-transform duration-300 ease-in-out",
          // Desktop: always visible, static positioning
          "lg:static lg:shadow-none lg:transform-none",
          // Mobile: hidden by default, slide in when open
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo area - matching header height */}
          <div className="h-header flex items-center px-6 border-b border-card-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-primary-foreground rounded-sm" />
              </div>
              <span className="font-semibold text-lg text-foreground">
                FinTrack
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.label}
                    variant={item.active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10 transition-colors",
                      item.active
                        ? "bg-button-green/15 text-button-green hover:bg-button-green/20"
                        : "text-text-green hover:bg-hover-text-green/10 hover:text-hover-text-green"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </nav>

          {/* User section at bottom */}
          <div className="p-4 border-t border-card-border">
            <div className="text-xs text-muted-foreground mb-2">John Doe</div>
            <div className="text-xs text-muted-foreground">
              john.doe@fintrack.com
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
