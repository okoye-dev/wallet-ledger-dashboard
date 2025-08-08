import { useEffect, useRef, useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  maxVisibleTabs?: {
    mobile: number;
    sm: number;
    md: number;
    lg: number;
  };
}

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  maxVisibleTabs = {
    mobile: 2, // On mobile, show 2 tabs
    sm: 4, // From sm: show 4 tabs (25% each)
    md: 6, // From md: show 6 tabs
    lg: 8, // From lg: show 8 tabs
  },
}: TabNavigationProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeTabElement, setActiveTabElement] = useState<HTMLElement | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLElement }>({});
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Get current max visible tabs based on screen size
  const getCurrentMaxTabs = () => {
    if (typeof window === "undefined") return maxVisibleTabs.mobile;

    const width = window.innerWidth;
    if (width >= 1024) return maxVisibleTabs.lg; // lg
    if (width >= 768) return maxVisibleTabs.md; // md
    if (width >= 640) return maxVisibleTabs.sm; // sm
    return maxVisibleTabs.mobile; // mobile
  };

  const [maxVisible, setMaxVisible] = useState(getCurrentMaxTabs());

  // Calculate tab width based on screen size and max visible tabs
  const calculateTabWidth = () => {
    if (!containerRef.current) return 0;

    const currentMaxTabs = getCurrentMaxTabs();
    const actualTabCount = Math.min(tabs.length, currentMaxTabs);

    // On sm+ screens, ensure tabs don't exceed 25% width each (max 4 tabs visible)
    if (window.innerWidth >= 640) {
      const maxTabsForWidth = Math.min(actualTabCount, 4);
      return containerRef.current.offsetWidth / maxTabsForWidth;
    }

    return containerRef.current.offsetWidth / actualTabCount;
  };

  // Update container width and recalculate on resize
  const updateDimensions = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setMaxVisible(getCurrentMaxTabs());
    }
  };

  // Set up ResizeObserver for smooth resize handling
  useEffect(() => {
    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        updateDimensions();
      });

      resizeObserverRef.current.observe(containerRef.current);

      // Initial calculation
      updateDimensions();
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  // Handle window resize for breakpoint changes
  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track active tab element for indicator positioning
  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    if (activeEl) {
      setActiveTabElement(activeEl);
    }
  }, [activeTab, containerWidth]);

  // Calculate indicator position and width
  const getIndicatorStyle = () => {
    if (!activeTabElement || !containerRef.current) {
      return { transform: "translateX(0)", width: "0px" };
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const activeRect = activeTabElement.getBoundingClientRect();
    const translateX = activeRect.left - containerRect.left;

    return {
      transform: `translateX(${translateX}px)`,
      width: `${activeRect.width}px`,
    };
  };

  // Calculate tab width
  const tabWidth = calculateTabWidth();

  return (
    <div className="relative overflow-hidden">
      <div ref={containerRef} className="flex" style={{ width: "100%" }}>
        {tabs.map((tab) => (
          <h2
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current[tab.id] = el;
            }}
            onClick={() => onTabChange(tab.id)}
            className={`pb-2 text-[15px] font-medium transition-colors cursor-pointer py-[8px] px-[20px] lg:py-[12px] lg:px-[28px] text-center ${
              activeTab === tab.id
                ? "text-text-header"
                : "text-muted-foreground hover:text-text-header"
            }`}
            style={{
              width: `${tabWidth}px`,
              flexShrink: 0,
            }}
          >
            {tab.label}
          </h2>
        ))}
      </div>

      {/* Background line spanning full width */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border"></div>

      {/* Animated active line */}
      <div
        className="absolute bottom-0 h-0.5 bg-text-header transition-all duration-300 ease-out"
        style={getIndicatorStyle()}
      ></div>
    </div>
  );
};

export default TabNavigation;
