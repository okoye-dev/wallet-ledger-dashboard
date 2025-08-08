import { FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyTransactionStateProps {
  onAddTransaction?: () => void;
}

export const EmptyTransactionState = ({
  onAddTransaction,
}: EmptyTransactionStateProps) => {
  return (
    <div className="bg-surface rounded-lg border border-border/50">
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="mb-4 rounded-full bg-muted p-3">
          <FileX className="h-8 w-8 text-muted-foreground" />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">
          No transactions found
        </h3>

        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          You don't have any transactions yet. Start adding transactions to see
          them here.
        </p>

        {onAddTransaction && (
          <Button onClick={onAddTransaction} size="sm">
            Add Transaction
          </Button>
        )}
      </div>
    </div>
  );
};
