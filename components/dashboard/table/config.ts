import { SortField } from "@/types/dashboard";

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
    width: "",
    padding: TABLE_STYLES.cellPadding.first,
    textAlign: "text-left",
    sortable: true,
  },
  {
    field: "remark",
    label: "Remark",
    width: "min-w-fit",
    padding: TABLE_STYLES.cellPadding.middle,
    textAlign: "text-left",
    sortable: true,
  },
  {
    field: "amount",
    label: "Amount",
    width: "min-w-fit",
    padding: TABLE_STYLES.cellPadding.middle,
    textAlign: "text-left",
    sortable: true,
  },
  {
    label: "Currency",
    width: "min-w-fit",
    padding: TABLE_STYLES.cellPadding.middle,
    textAlign: "text-left",
    sortable: false,
  },
  {
    field: "type",
    label: "Type",
    width: "min-w-fit",
    padding: TABLE_STYLES.cellPadding.middle,
    textAlign: "text-left",
    sortable: true,
  },
];
