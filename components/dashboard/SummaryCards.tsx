import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  className?: string;
}

const SummaryCard = ({
  title,
  value,
  change,
  className,
}: SummaryCardProps) => {
  const isPositive = change > 0;

  return (
    <Card className={cn(className, "rounded-[20px] bg-summary-card-bg")}>
      <CardHeader className="flex flex-row justify-between px-0">
        <p className="text-[17px] font-medium text-muted-foreground">{title}</p>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex-col flex gap-1 justify-between">
          <strong className="text-4xl lg:text-[34px] font-bold text-foreground">
            {value}
          </strong>
          <span
            className={cn(
              "text-sm lg:text-[13px] font-medium",
              isPositive ? "text-success" : "text-danger"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

interface SummaryCardsProps {
  summary: {
    totalBalance: number;
    totalCredits: number;
    totalDebits: number;
    transactionCount: number;
    balanceChange: number;
    creditsChange: number;
    debitsChange: number;
    transactionChange: number;
  };
}

const SummaryCards = ({ summary }: SummaryCardsProps) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US").format(num);

  return (
    <div className="px-6 py-6 bg-background">
      <div className="mb-4">
        <h2 className="text-[20px] font-bold">Summary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Balance"
          value={formatCurrency(summary.totalBalance)}
          change={summary.balanceChange}
          trend={summary.balanceChange >= 0 ? "up" : "down"}
        />

        <SummaryCard
          title="Total Credits"
          value={formatCurrency(summary.totalCredits)}
          change={summary.creditsChange}
          trend={summary.creditsChange >= 0 ? "up" : "down"}
        />

        <SummaryCard
          title="Total Debits"
          value={formatCurrency(summary.totalDebits)}
          change={summary.debitsChange}
          trend={summary.debitsChange >= 0 ? "down" : "up"}
        />

        <SummaryCard
          title="Transactions"
          value={formatNumber(summary.transactionCount)}
          change={summary.transactionChange}
          trend={summary.transactionChange >= 0 ? "up" : "down"}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
