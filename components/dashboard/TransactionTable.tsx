"use client";

import { useState, useMemo } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Transaction, SortDirection, SortField } from "@/types/dashboard";
import { DownArrow } from "../icons/DownArrow";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "date") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === "amount") {
        aValue = Math.abs(aValue);
        bValue = Math.abs(bValue);
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [transactions, sortField, sortDirection]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(Math.abs(amount));
  };

  const SortArrow = ({ field }: { field: SortField }) => {
    const isActive = sortField === field;
    const isAscending = isActive && sortDirection === "asc";

    return (
      <div
        className={`transition-transform duration-200 ${
          isAscending ? "rotate-180" : ""
        }`}
      >
        <DownArrow size="sm" />
      </div>
    );
  };

  return (
    <div className="px-6 py-6 bg-surface">
      <div className="border border-card-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-muted">
            <TableRow className="border-b border-card-border">
              <TableHead className="py-4 pl-[18px] pr-[9px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("date")}
                  className="h-auto p-0 font-semibold text-[#15272d]/25 hover:text-foreground flex items-center justify-between w-full"
                >
                  <span>Date</span>
                  <SortArrow field="date" />
                </Button>
              </TableHead>
              <TableHead className="py-4 px-[9px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("remark")}
                  className="h-auto p-0 font-semibold text-[#15272d]/25 hover:text-foreground flex items-center justify-between w-full"
                >
                  <span>Remark</span>
                  <SortArrow field="remark" />
                </Button>
              </TableHead>
              <TableHead className="py-4 px-[9px] text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("amount")}
                  className="h-auto p-0 font-semibold text-[#15272d]/25 hover:text-foreground flex items-center justify-between w-full"
                >
                  <span>Amount</span>
                  <SortArrow field="amount" />
                </Button>
              </TableHead>
              <TableHead className="py-4 px-[9px] text-center">
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-[#15272d]/25">
                    Currency
                  </span>
                  <DownArrow size="sm" />
                </div>
              </TableHead>
              <TableHead className="py-4 px-[9px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("type")}
                  className="h-auto p-0 font-semibold text-[#15272d]/25 hover:text-foreground flex items-center justify-between w-full"
                >
                  <span>Type</span>
                  <SortArrow field="type" />
                </Button>
              </TableHead>
              <TableHead className="w-12 py-4 pr-[18px] pl-[9px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="border-b border-[#49656e]/20 hover:bg-surface-muted/50 transition-colors"
              >
                <TableCell className="font-mono text-sm py-4 pl-[18px] pr-[9px]">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className="font-medium py-4 px-[9px]">
                  {transaction.remark}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-semibold py-4 px-[9px]",
                    transaction.type === "Credit"
                      ? "text-success"
                      : "text-danger"
                  )}
                >
                  {transaction.type === "Debit" ? "-" : ""}
                  {formatAmount(transaction.amount, transaction.currency)}
                </TableCell>
                <TableCell className="text-center py-4 px-[9px]">
                  <Badge variant="outline" className="text-xs font-mono">
                    {transaction.currency}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-[9px]">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        transaction.type === "Credit"
                          ? "bg-success"
                          : "bg-danger"
                      )}
                    />
                    <span className="text-sm font-medium">
                      {transaction.type}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 pr-[18px] pl-[9px]">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
