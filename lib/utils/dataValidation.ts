import { Transaction, DashboardSummary } from "@/types/dashboard";

// Validation utilities for dashboard data
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
};

export const isValidAmount = (amount: number): boolean => {
  return typeof amount === "number" && !isNaN(amount) && isFinite(amount);
};

export const isValidCurrency = (currency: string): boolean => {
  return (
    typeof currency === "string" &&
    currency.length === 3 &&
    /^[A-Z]{3}$/.test(currency)
  );
};

export const isValidTransactionType = (
  type: string
): type is "Credit" | "Debit" => {
  return type === "Credit" || type === "Debit";
};

export const validateTransaction = (
  transaction: any
): transaction is Transaction => {
  if (!transaction || typeof transaction !== "object") return false;

  return (
    typeof transaction.id === "string" &&
    transaction.id.trim().length > 0 &&
    isValidDate(transaction.date) &&
    typeof transaction.remark === "string" &&
    transaction.remark.trim().length > 0 &&
    isValidAmount(transaction.amount) &&
    transaction.amount > 0 &&
    isValidCurrency(transaction.currency) &&
    isValidTransactionType(transaction.type)
  );
};

export const validateDashboardSummary = (
  summary: any
): summary is DashboardSummary => {
  if (!summary || typeof summary !== "object") return false;

  const requiredFields = [
    "totalBalance",
    "totalCredits",
    "totalDebits",
    "transactionCount",
    "balanceChange",
    "creditsChange",
    "debitsChange",
    "transactionChange",
  ];

  return requiredFields.every(
    (field) => field in summary && isValidAmount(summary[field])
  );
};

export const sanitizeTransactions = (transactions: any[]): Transaction[] => {
  if (!Array.isArray(transactions)) return [];

  return transactions.filter(validateTransaction);
};

export const createDefaultSummary = (): DashboardSummary => ({
  totalBalance: 0,
  totalCredits: 0,
  totalDebits: 0,
  transactionCount: 0,
  balanceChange: 0,
  creditsChange: 0,
  debitsChange: 0,
  transactionChange: 0,
});

export const sanitizeDashboardSummary = (summary: any): DashboardSummary => {
  if (validateDashboardSummary(summary)) {
    return summary;
  }

  console.warn("Invalid dashboard summary data, using defaults");
  return createDefaultSummary();
};
