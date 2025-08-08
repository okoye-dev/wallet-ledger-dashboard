"use client";

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/types/dashboard";
import { useTableSort } from "@/hooks/useTableSort";
import { TableHeaderRow } from "./table/TableHeader";
import { TransactionTableSkeleton } from "./loading/TransactionTableSkeleton";
import { EmptyTransactionState } from "./empty/EmptyTransactionState";
import { ErrorBoundary, DefaultErrorFallback } from "./error/ErrorBoundary";
import { sanitizeTransactions } from "@/lib/utils/dataValidation";
import {
  DateCell,
  RemarkCell,
  AmountCell,
  CurrencyCell,
  TypeCell,
} from "./table/TableCells";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  error?: Error | null;
  onAddTransaction?: () => void;
  selectedTransactionId?: string | null;
}

const TransactionTableContent = ({
  transactions,
  onAddTransaction,
  selectedTransactionId,
}: {
  transactions: Transaction[];
  onAddTransaction?: () => void;
  selectedTransactionId?: string | null;
}) => {
  const sanitizedTransactions = sanitizeTransactions(transactions);

  const { sortField, sortDirection, sortedTransactions, handleSort } =
    useTableSort({
      transactions: sanitizedTransactions,
    });

  if (sanitizedTransactions.length === 0) {
    return <EmptyTransactionState onAddTransaction={onAddTransaction} />;
  }

  return (
    <div className="bg-surface overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderRow
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedTransactions.map((transaction, index) => {
            const isSelected = selectedTransactionId === transaction.id;
            return (
              <TableRow
                key={transaction.id}
                className={cn(
                  "hover:bg-surface-muted/50 transition-colors border-b-0",
                  isSelected && "bg-yellow-50 dark:bg-yellow-900/20"
                )}
              >
                <DateCell
                  date={transaction.date}
                  isLastRow={index === sortedTransactions.length - 1}
                />
                <RemarkCell
                  remark={transaction.remark}
                  isLastRow={index === sortedTransactions.length - 1}
                />
                <AmountCell
                  amount={transaction.amount}
                  type={transaction.type}
                  isLastRow={index === sortedTransactions.length - 1}
                />
                <CurrencyCell
                  currency={transaction.currency}
                  isLastRow={index === sortedTransactions.length - 1}
                />
                <TypeCell
                  type={transaction.type}
                  isLastRow={index === sortedTransactions.length - 1}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const TransactionTable = ({
  transactions,
  isLoading = false,
  error,
  onAddTransaction,
  selectedTransactionId,
}: TransactionTableProps) => {
  if (isLoading) {
    return <TransactionTableSkeleton />;
  }

  if (error) {
    return (
      <DefaultErrorFallback
        error={error}
        resetError={() => window.location.reload()}
      />
    );
  }

  return (
    <ErrorBoundary>
      <TransactionTableContent
        transactions={transactions}
        onAddTransaction={onAddTransaction}
        selectedTransactionId={selectedTransactionId}
      />
    </ErrorBoundary>
  );
};

export { TransactionTable };
