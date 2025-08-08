import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUMMARY_STYLES } from "./config";

interface SummaryCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  className?: string;
}

export const SummaryCard = ({
  title,
  value,
  change,
  className,
}: SummaryCardProps) => {
  const isPositive = change > 0;

  return (
    <Card
      className={cn(
        className,
        SUMMARY_STYLES.cardRadius,
        SUMMARY_STYLES.cardBg
      )}
    >
      <CardHeader className="flex flex-row justify-between px-0">
        <p
          className={`${SUMMARY_STYLES.titleSize} text-muted-foreground font-bold`}
        >
          {title}
        </p>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex-col flex gap-1 justify-between">
          <strong
            className={`${SUMMARY_STYLES.valueSize} font-bold text-foreground`}
          >
            {value}
          </strong>
          <span
            className={`${SUMMARY_STYLES.changeSize} font-medium text-[#3E7383]`}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
