import { DashboardSummary } from "@/types/dashboard";
import { useSummaryData } from "@/hooks/useSummaryData";
import { SummaryCard } from "./summary/SummaryCard";
import { SUMMARY_STYLES } from "./summary/config";

interface SummaryCardsProps {
  summary: DashboardSummary;
}

const SummaryCards = ({ summary }: SummaryCardsProps) => {
  const { formattedCards } = useSummaryData({ summary });

  return (
    <div className="bg-background">
      <h2 className={`${SUMMARY_STYLES.headerSize} font-bold mb-4`}>Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {formattedCards.map((card, index) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            trend={card.trend}
          />
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
