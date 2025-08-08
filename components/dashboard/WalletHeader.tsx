import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownArrow } from "@/components/icons";
import TabNavigation from "@/components/ui/tab-navigation";
import IconWrapper from "@/components/icons/IconWrapper";
import UserProfiles from "@/components/ui/profile-container";
import { useState } from "react";

const WalletHeader = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
    <div className="bg-surface">
      {/* Wallet title and actions */}
      <section className="flex items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-1 xs:gap-2 md:gap-3">
          <h1 className="text-[16px] xs:text-[18px] md:text-[28px] lg:text-[34px] flex items-center gap-1 md:gap-2 font-bold tracking-tight">
            Wallet Ledger
            <DownArrow size="sm" />
          </h1>
          <StatusBadge status="Active" />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 md:gap-2 bg-green-share hover:bg-green-share/80 rounded-2xl text-[9px] xs:text-[10px] md:text-sm px-1.5 xs:px-2 md:px-3"
          >
            Share
          </Button>

          <IconWrapper variant="bordered" size="md">
            <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
          </IconWrapper>
        </div>
      </section>

      {/* User profiles */}
      <UserProfiles
        profiles={profiles}
        additionalCount={12}
        size="md"
        showNames={true}
      />

      {/* Tab navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export { WalletHeader };
