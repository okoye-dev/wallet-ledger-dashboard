import { useState, useMemo } from "react";
import { Transaction, SortDirection, SortField } from "@/types/dashboard";
import { sortTransactions } from "@/lib/utils/dashboardTable";

interface UseTableSortProps {
  transactions: Transaction[];
  initialSortField?: SortField;
  initialSortDirection?: SortDirection;
}

export const useTableSort = ({
  transactions,
  initialSortField = "date",
  initialSortDirection = "desc",
}: UseTableSortProps) => {
  const [sortField, setSortField] = useState<SortField>(initialSortField);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialSortDirection);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedTransactions = useMemo(() => {
    return sortTransactions(transactions, sortField, sortDirection);
  }, [transactions, sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    sortedTransactions,
    handleSort,
  };
};
