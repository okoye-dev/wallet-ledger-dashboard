import { DashboardSummary } from "@/types/dashboard";
import { useSummaryData } from "@/hooks/useSummaryData";
import { SummaryCard } from "./summary/SummaryCard";
import { SummaryCardsLoadingSkeleton } from "./loading/SummaryCardSkeleton";
import { ErrorBoundary, DefaultErrorFallback } from "./error/ErrorBoundary";
import { SUMMARY_STYLES } from "./summary/config";
import {
  sanitizeDashboardSummary,
  createDefaultSummary,
} from "@/lib/utils/dataValidation";

interface SummaryCardsProps {
  summary?: DashboardSummary;
  isLoading?: boolean;
  error?: Error | null;
}

const SummaryCardsContent = ({ summary }: { summary: DashboardSummary }) => {
  const sanitizedSummary = sanitizeDashboardSummary(summary);
  const { formattedCards } = useSummaryData({ summary: sanitizedSummary });

  return (
    <div className="bg-background">
      <h2 className={`${SUMMARY_STYLES.headerSize} font-bold mb-4`}>Summary</h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {formattedCards.map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
          />
        ))}
      </div>
    </div>
  );
};

const SummaryCards = ({
  summary,
  isLoading = false,
  error,
}: SummaryCardsProps) => {
  if (isLoading) {
    return <SummaryCardsLoadingSkeleton />;
  }

  if (error) {
    return (
      <DefaultErrorFallback
        error={error}
        resetError={() => window.location.reload()}
      />
    );
  }

  // Use default summary if none provided
  const validSummary = summary || createDefaultSummary();

  return (
    <ErrorBoundary>
      <SummaryCardsContent summary={validSummary} />
    </ErrorBoundary>
  );
};

export { SummaryCards };
