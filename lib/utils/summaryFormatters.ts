// Formatting utilities for summary cards
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));

export const formatNumber = (num: number): string =>
  new Intl.NumberFormat("en-US").format(num);

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
  const isPositive = change >= 0;
  if (invertTrend) {
    return isPositive ? "down" : "up";
  }
  return isPositive ? "up" : "down";
};
