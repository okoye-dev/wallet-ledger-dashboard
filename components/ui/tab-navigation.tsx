interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) => {
  // Define responsive dimensions for each tab
  const getTabDimensions = (tabId: string) => {
    switch (tabId) {
      case "overview":
        return {
          width: "w-[110px] lg:w-[120px]",
          translate: "translate-x-0",
        };
      case "transactions":
        return {
          width: "w-[140px] lg:w-[160px]",
          translate: "translate-x-[125px] lg:translate-x-[145px]",
        };
      default:
        return {
          width: "w-[100px]",
          translate: "translate-x-0",
        };
    }
  };

  const activeDimensions = getTabDimensions(activeTab);

  return (
    <div className="relative">
      <div className="flex gap-6 lg:gap-8">
        {tabs.map((tab) => (
          <h2
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-2 text-[15px] font-medium transition-colors cursor-pointer py-[8px] px-[20px] lg:py-[12px] lg:px-[28px] ${
              activeTab === tab.id
                ? "text-text-header"
                : "text-muted-foreground hover:text-text-header"
            }`}
          >
            {tab.label}
          </h2>
        ))}
      </div>

      {/* Background line spanning full width */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border"></div>

      {/* Animated active line */}
      <div
        className={`absolute bottom-0 h-0.5 bg-text-header transition-transform duration-300 ease-out ${activeDimensions.width} ${activeDimensions.translate}`}
      ></div>
    </div>
  );
};

export default TabNavigation;
