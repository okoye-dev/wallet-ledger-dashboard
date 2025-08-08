import { Transaction } from "@/types/dashboard";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const sortTransactions = (
  transactions: Transaction[],
  field: keyof Transaction,
  direction: "asc" | "desc"
): Transaction[] => {
  return [...transactions].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // Handle different data types
    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue);
      return direction === "asc" ? comparison : -comparison;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      const comparison = aValue - bValue;
      return direction === "asc" ? comparison : -comparison;
    }

    // Handle Date fields (assuming they are stored as strings)
    if (field === "date") {
      const dateA = new Date(aValue as string);
      const dateB = new Date(bValue as string);
      const comparison = dateA.getTime() - dateB.getTime();
      return direction === "asc" ? comparison : -comparison;
    }

    // Fallback for other types
    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });
};
