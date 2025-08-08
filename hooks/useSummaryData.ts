import { useMemo } from "react";
import { DashboardSummary } from "@/types/dashboard";
import {
  SUMMARY_CARDS_CONFIG,
  SummaryCardConfig,
} from "@/components/dashboard/summary/config";
import { formatValue, calculateTrend } from "@/lib/utils/summaryFormatters";

export interface FormattedSummaryCard {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

interface UseSummaryDataProps {
  summary: DashboardSummary;
}

export const useSummaryData = ({ summary }: UseSummaryDataProps) => {
  const formattedCards = useMemo(() => {
    return SUMMARY_CARDS_CONFIG.map(
      (config: SummaryCardConfig): FormattedSummaryCard => {
        const value = summary[config.key] as number;
        const change = summary[config.changeKey] as number;

        return {
          title: config.title,
          value: formatValue(value, config.type),
          change,
          trend: calculateTrend(change, config.invertTrend),
        };
      }
    );
  }, [summary]);

  return {
    formattedCards,
  };
};
