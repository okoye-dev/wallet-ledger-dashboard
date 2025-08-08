import { SortField } from "@/types/dashboard";

// Table styling constants
export const TABLE_COLUMN_WIDTHS = {
  date: "w-[30%]",
  remark: "w-[25%]",
  amount: "w-[15%]",
  currency: "w-[10%]",
  type: "w-[15%]",
  actions: "w-[5%]",
} as const;

export const TABLE_STYLES = {
  headerColor: "text-[#15272d]/[0.62]",
  borderColor: "bg-[#49656e]/20",
  cellPadding: {
    first: "pl-[18px] pr-[9px]",
    middle: "px-[9px]",
    last: "pr-[18px] pl-[9px]",
  },
} as const;

// Table configuration
export interface TableHeaderConfig {
  field?: SortField;
  label: string;
  width: string;
  padding: string;
  textAlign?: string;
  sortable: boolean;
}

export const TABLE_HEADERS: TableHeaderConfig[] = [
  {
    field: "date",
    label: "Date",
    width: TABLE_COLUMN_WIDTHS.date,
    padding: TABLE_STYLES.cellPadding.first,
    sortable: true,
  },
  {
    field: "remark",
    label: "Remark",
    width: TABLE_COLUMN_WIDTHS.remark,
    padding: TABLE_STYLES.cellPadding.middle,
    sortable: true,
  },
  {
    field: "amount",
    label: "Amount",
    width: TABLE_COLUMN_WIDTHS.amount,
    padding: TABLE_STYLES.cellPadding.middle,
    textAlign: "text-right",
    sortable: true,
  },
  {
    label: "Currency",
    width: TABLE_COLUMN_WIDTHS.currency,
    padding: TABLE_STYLES.cellPadding.middle,
    textAlign: "text-center",
    sortable: false,
  },
  {
    field: "type",
    label: "Type",
    width: TABLE_COLUMN_WIDTHS.type,
    padding: TABLE_STYLES.cellPadding.middle,
    sortable: true,
  },
  {
    label: "",
    width: TABLE_COLUMN_WIDTHS.actions,
    padding: TABLE_STYLES.cellPadding.last,
    sortable: false,
  },
];
