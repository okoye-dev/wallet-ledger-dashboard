"use client";

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/types/dashboard";
import { useTableSort } from "@/hooks/useTableSort";
import { TableHeaderRow } from "./table/TableHeader";
import {
  DateCell,
  RemarkCell,
  AmountCell,
  CurrencyCell,
  TypeCell,
} from "./table/TableCells";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const { sortField, sortDirection, sortedTransactions, handleSort } =
    useTableSort({
      transactions,
    });

  return (
    <div className="bg-surface overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-card-border">
            <TableHeaderRow
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              className="hover:bg-surface-muted/50 transition-colors border-b-0"
            >
              <DateCell date={transaction.date} />
              <RemarkCell remark={transaction.remark} />
              <AmountCell
                amount={transaction.amount}
                currency={transaction.currency}
                type={transaction.type}
              />
              <CurrencyCell currency={transaction.currency} />
              <TypeCell type={transaction.type} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
