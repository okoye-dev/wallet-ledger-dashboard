import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownArrow } from "@/components/icons";
import TabNavigation from "@/components/ui/tab-navigation";
import IconWrapper from "@/components/icons/IconWrapper";
import UserProfiles from "@/components/ui/profile-container";

interface WalletHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const WalletHeader = ({ activeTab, onTabChange }: WalletHeaderProps) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "transactions", label: "Transactions" },
  ];

  // Profile data using the available profile images
  const profiles = [
    { name: "John Doe", image: "/profile-1.png" },
    { name: "Jane Smith", image: "/profile-2.png" },
    { name: "Mike Johnson", image: "/profile-3.png" },
    { name: "Sarah Wilson", image: "/profile-4.png" },
  ];

  return (
    <div>
      {/* Wallet title and actions */}
      <section className="flex items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-1 xs:gap-2 md:gap-3">
          <h1 className="text-[14px] xs:text-[16px] md:text-[28px] lg:text-[34px] flex items-center gap-1 md:gap-2 font-bold tracking-tight">
            Wallet Ledger
            <DownArrow size="sm" />
          </h1>
          <StatusBadge status="Active" size="sm" />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-0.5 md:gap-2 h-7 md:text-xs bg-green-share hover:bg-green-share/80 rounded-2xl text-[8px] xs:text-[9px] px-3"
          >
            Share
          </Button>

          <IconWrapper variant="bordered" size="sm">
            <MoreHorizontal className="h-2.5 w-2.5 md:h-4 md:w-4" />
          </IconWrapper>
        </div>
      </section>

      {/* User profiles */}
      <UserProfiles
        profiles={profiles}
        additionalCount={12}
        size="sm"
        showNames={true}
      />

      {/* Tab navigation */}
      <section className="relative w-full">
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-border w-full"></span>
        <div className="max-w-md lg:max-w-sm w-full">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>
      </section>
    </div>
  );
};

export { WalletHeader };
