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
  transaction: unknown
): transaction is Transaction => {
  if (!transaction || typeof transaction !== "object") return false;

  const t = transaction as Record<string, unknown>;

  return (
    typeof t.id === "string" &&
    t.id.trim().length > 0 &&
    typeof t.date === "string" &&
    isValidDate(t.date) &&
    typeof t.remark === "string" &&
    t.remark.trim().length > 0 &&
    typeof t.amount === "number" &&
    isValidAmount(t.amount) &&
    t.amount > 0 &&
    typeof t.currency === "string" &&
    isValidCurrency(t.currency) &&
    typeof t.type === "string" &&
    isValidTransactionType(t.type)
  );
};

export const validateDashboardSummary = (
  summary: unknown
): summary is DashboardSummary => {
  if (!summary || typeof summary !== "object") return false;

  const s = summary as Record<string, unknown>;

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
    (field) =>
      field in s &&
      typeof s[field] === "number" &&
      isValidAmount(s[field] as number)
  );
};

export const sanitizeTransactions = (
  transactions: unknown[]
): Transaction[] => {
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

export const sanitizeDashboardSummary = (
  summary: unknown
): DashboardSummary => {
  if (validateDashboardSummary(summary)) {
    return summary;
  }

  console.warn("Invalid dashboard summary data, using defaults");
  return createDefaultSummary();
};
