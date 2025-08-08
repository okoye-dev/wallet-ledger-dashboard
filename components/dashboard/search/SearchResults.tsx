"use client";

import { Transaction } from "@/types/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, CreditCard, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatAmount } from "@/lib/utils/dashboardTable";
import { highlightMatch } from "@/lib/utils/textUtils";

interface SearchResultsProps {
  query: string;
  transactions: Transaction[];
  isLoading?: boolean;
  onTransactionClick?: (transaction: Transaction) => void;
  onClose?: () => void;
  onNavigateToTransactions?: () => void;
  className?: string;
}

export const SearchResults = ({
  query,
  transactions,
  isLoading = false,
  onTransactionClick,
  onClose,
  onNavigateToTransactions,
  className,
}: SearchResultsProps) => {
  if (!query.trim()) {
    return (
      <Card className={cn("absolute top-full mt-2 w-full z-50", className)}>
        <CardContent className="p-4">
          <div className="text-center text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Start typing to search transactions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className={cn("absolute top-full mt-2 w-full z-50", className)}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-3">
                <div className="rounded-full bg-muted h-10 w-10" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className={cn("absolute top-full mt-2 w-full z-50", className)}>
        <CardContent className="p-4">
          <div className="text-center text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              No transactions found for &quot;{query}&quot;
            </p>
            <p className="text-xs mt-1">Try searching for a different term</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "absolute top-full mt-2 w-full z-50 max-h-[80vh] overflow-y-auto shadow-xl border-border/50",
        className
      )}
    >
      <CardContent>
        <div className="mb-3 px-1">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Found {transactions.length} transaction
            {transactions.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-1">
          {transactions.map((transaction) => (
            <Button
              key={transaction.id}
              variant="ghost"
              onClick={() => onTransactionClick?.(transaction)}
              className="w-full justify-start h-auto p-2 sm:p-3 hover:bg-foreground/5 cursor-pointer transition-colors duration-150 rounded-lg"
            >
              <div className="flex items-center space-x-2 sm:space-x-2.5 w-full">
                {/* Transaction Type Icon */}
                <div
                  className={cn(
                    "flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center",
                    transaction.type === "Credit"
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                  )}
                >
                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>

                {/* Transaction Details */}
                <section className="flex-1 text-left">
                  {/* Top Row: Remark and Amount */}
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-xs sm:text-sm text-foreground">
                      {highlightMatch(transaction.remark, query)}
                    </p>
                    <span className="font-semibold text-xs sm:text-sm text-foreground">
                      {transaction.type === "Debit" ? "-" : ""}
                      {formatAmount(transaction.amount)}
                    </span>
                  </div>

                  {/* Bottom Row: Date, Currency, and Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {formatDate(transaction.date)}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        •
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {transaction.currency}
                      </span>
                    </div>
                    <StatusBadge status={transaction.type} size="sm" />
                  </div>
                </section>
              </div>
            </Button>
          ))}
        </div>

        {/* View All Results */}
        {transactions.length > 5 && (
          <div className="border-t mt-3 pt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                onNavigateToTransactions?.();
                onClose?.();
              }}
            >
              View All Results
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
