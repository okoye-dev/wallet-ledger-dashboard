import { DashboardSummary } from "@/types/dashboard";

export interface SummaryCardConfig {
  key: keyof DashboardSummary;
  changeKey: keyof DashboardSummary;
  title: string;
  type: "currency" | "number";
  invertTrend?: boolean; // For debits where negative change is actually good
}

export const SUMMARY_CARDS_CONFIG: SummaryCardConfig[] = [
  {
    key: "totalBalance",
    changeKey: "balanceChange",
    title: "Total Balance",
    type: "currency",
  },
  {
    key: "totalCredits",
    changeKey: "creditsChange",
    title: "Total Credits",
    type: "currency",
  },
  {
    key: "totalDebits",
    changeKey: "debitsChange",
    title: "Total Debits",
    type: "currency",
    invertTrend: true, // For debits, negative change is good
  },
  {
    key: "transactionCount",
    changeKey: "transactionChange",
    title: "Transactions",
    type: "number",
  },
];

export const SUMMARY_STYLES = {
  cardBg: "bg-summary-card-bg",
  cardRadius: "rounded-[20px]",
  titleSize: "text-[10px] xs:text-[12px] md:text-[15px] lg:text-[17px]",
  valueSize: "text-2xl xs:text-3xl lg:text-[34px]",
  changeSize: "text-sm lg:text-[13px]",
  headerSize: "text-[18px] lg:text-[20px]",
} as const;
