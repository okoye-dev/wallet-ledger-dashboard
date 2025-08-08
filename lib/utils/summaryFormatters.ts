// Formatting utilities for summary cards
export const formatCurrency = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount) || !isFinite(amount)) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

export const formatNumber = (num: number): string => {
  if (typeof num !== "number" || isNaN(num) || !isFinite(num)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US").format(num);
};

export const formatValue = (
  value: number,
  type: "currency" | "number"
): string => {
  return type === "currency" ? formatCurrency(value) : formatNumber(value);
};

export const calculateTrend = (
  change: number,
  invertTrend?: boolean
): "up" | "down" => {
  // Handle edge cases
  if (typeof change !== "number" || isNaN(change)) {
    return "up"; // Default to positive trend
  }

  const isPositive = change >= 0;
  if (invertTrend) {
    return isPositive ? "down" : "up";
  }
  return isPositive ? "up" : "down";
};
