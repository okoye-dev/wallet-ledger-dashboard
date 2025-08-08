import { TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import { formatDate, formatAmount } from "@/lib/utils/dashboardTable";
import { TABLE_STYLES } from "@/components/dashboard/table/config";

interface BaseCellProps {
  children: React.ReactNode;
  className?: string;
  padding: string;
  isLastRow?: boolean;
}

const BaseCell = ({
  children,
  className,
  padding,
  isLastRow = false,
}: BaseCellProps) => (
  <TableCell className={`py-4 ${padding} relative ${className || ""}`}>
    {children}
    {!isLastRow && (
      <div
        className={`absolute bottom-0 h-0.5 ${TABLE_STYLES.borderColor} ${
          padding.includes("pl-[18px]") ? "left-[18px]" : "left-[9px]"
        } ${padding.includes("pr-[18px]") ? "right-[18px]" : "right-[9px]"}`}
      ></div>
    )}
  </TableCell>
);

interface DateCellProps {
  date: string;
  isLastRow?: boolean;
}

export const DateCell = ({ date, isLastRow }: DateCellProps) => (
  <BaseCell
    className={`font-mono ${TABLE_STYLES.cellColor} ${TABLE_STYLES.textSizes.cell}`}
    padding="pl-[18px] pr-[9px]"
    isLastRow={isLastRow}
  >
    {formatDate(date)}
  </BaseCell>
);

interface RemarkCellProps {
  remark: string;
  isLastRow?: boolean;
}

export const RemarkCell = ({ remark, isLastRow }: RemarkCellProps) => (
  <BaseCell
    className={`font-medium ${TABLE_STYLES.cellColor} ${TABLE_STYLES.textSizes.cell}`}
    padding="px-[9px]"
    isLastRow={isLastRow}
  >
    {remark}
  </BaseCell>
);

interface AmountCellProps {
  amount: number;
  type: "Credit" | "Debit";
  isLastRow?: boolean;
}

export const AmountCell = ({ amount, type, isLastRow }: AmountCellProps) => (
  <BaseCell
    className={`text-left font-semibold ${TABLE_STYLES.cellColor} ${TABLE_STYLES.textSizes.cell}`}
    padding="px-[9px]"
    isLastRow={isLastRow}
  >
    {type === "Debit" ? "-" : ""}
    {formatAmount(amount)}
  </BaseCell>
);

interface CurrencyCellProps {
  currency: string;
  isLastRow?: boolean;
}

export const CurrencyCell = ({ currency, isLastRow }: CurrencyCellProps) => (
  <BaseCell
    className={`text-left ${TABLE_STYLES.cellColor} ${TABLE_STYLES.textSizes.cell}`}
    padding="px-[9px]"
    isLastRow={isLastRow}
  >
    {currency}
  </BaseCell>
);

interface TypeCellProps {
  type: "Credit" | "Debit";
  isLastRow?: boolean;
}

export const TypeCell = ({ type, isLastRow }: TypeCellProps) => (
  <BaseCell
    className={TABLE_STYLES.textSizes.cell}
    padding="px-[9px]"
    isLastRow={isLastRow}
  >
    <StatusBadge status={type} size="md" />
  </BaseCell>
);
