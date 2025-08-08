import { TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import { formatDate, formatAmount } from "@/lib/utils/dashboardTable";
import { TABLE_STYLES } from "./config";

interface BaseCellProps {
  children: React.ReactNode;
  className?: string;
  padding: string;
}

const BaseCell = ({ children, className, padding }: BaseCellProps) => (
  <TableCell className={`py-4 ${padding} relative ${className || ""}`}>
    {children}
    <div
      className={`absolute bottom-0 h-px ${TABLE_STYLES.borderColor} ${
        padding.includes("pl-[18px]") ? "left-[18px]" : "left-[9px]"
      } ${padding.includes("pr-[18px]") ? "right-[18px]" : "right-[9px]"}`}
    ></div>
  </TableCell>
);

interface DateCellProps {
  date: string;
}

export const DateCell = ({ date }: DateCellProps) => (
  <BaseCell className="text-sm text-foreground" padding="pl-[18px] pr-[9px]">
    {formatDate(date)}
  </BaseCell>
);

interface RemarkCellProps {
  remark: string;
}

export const RemarkCell = ({ remark }: RemarkCellProps) => (
  <BaseCell className="font-medium text-foreground" padding="px-[9px]">
    {remark}
  </BaseCell>
);

interface AmountCellProps {
  amount: number;
  currency: string;
  type: "Credit" | "Debit";
}

export const AmountCell = ({ amount, currency, type }: AmountCellProps) => (
  <BaseCell
    className={cn(
      "text-right font-semibold",
      type === "Credit" ? "text-success" : "text-danger"
    )}
    padding="px-[9px]"
  >
    {type === "Debit" ? "-" : ""}
    {formatAmount(amount)}
  </BaseCell>
);

interface CurrencyCellProps {
  currency: string;
}

export const CurrencyCell = ({ currency }: CurrencyCellProps) => (
  <BaseCell className="text-center text-foreground" padding="px-[9px]">
    {currency}
  </BaseCell>
);

interface TypeCellProps {
  type: "Credit" | "Debit";
}

export const TypeCell = ({ type }: TypeCellProps) => (
  <BaseCell className="" padding="px-[9px]">
    <StatusBadge status={type} />
  </BaseCell>
);
