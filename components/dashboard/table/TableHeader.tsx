import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { SortDirection, SortField } from "@/types/dashboard";
import { TABLE_HEADERS, TABLE_STYLES } from "./config";

// Fixed-size arrow component for table headers - smaller size for column headers
const TableArrow = ({ isRotated = false }: { isRotated?: boolean }) => (
  <div
    className={`transition-transform duration-200 flex-shrink-0 ${
      isRotated ? "rotate-180" : ""
    }`}
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.86274 9.25C8.65111 9.25 8.04529 9.25 7.76477 9.48959C7.52136 9.69749 7.39218 10.0093 7.4173 10.3285C7.44624 10.6962 7.87462 11.1246 8.73137 11.9814L10.8686 14.1186C11.2646 14.5146 11.4627 14.7127 11.691 14.7868C11.8918 14.8521 12.1082 14.8521 12.309 14.7868C12.5373 14.7127 12.7354 14.5146 13.1314 14.1186L15.2686 11.9814C16.1254 11.1246 16.5538 10.6962 16.5827 10.3285C16.6078 10.0093 16.4786 9.69749 16.2352 9.48959C15.9547 9.25 15.3489 9.25 14.1373 9.25H9.86274Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

interface SortArrowProps {
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
}

const SortArrow = ({ field, sortField, sortDirection }: SortArrowProps) => {
  const isActive = sortField === field;
  const isAscending = isActive && sortDirection === "asc";

  return <TableArrow isRotated={isAscending} />;
};

interface TableHeaderCellProps {
  config: (typeof TABLE_HEADERS)[0];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const TableHeaderCell = ({
  config,
  sortField,
  sortDirection,
  onSort,
}: TableHeaderCellProps) => {
  const getBorderStyle = () => {
    if (config.padding.includes("pl-[18px]")) {
      return "left-[18px] right-[9px]";
    } else if (config.padding.includes("pr-[18px]")) {
      return "left-[9px] right-[18px]";
    } else {
      return "left-[9px] right-[9px]";
    }
  };

  if (config.sortable && config.field) {
    return (
      <TableHead
        onClick={() => onSort(config.field!)}
        className={`py-4 ${config.padding} ${config.width} ${
          config.textAlign || ""
        } relative group cursor-pointer hover:bg-success-subtle/50 duration-300`}
      >
        <Button
          variant="ghost"
          className={`h-auto p-0 hover:bg-transparent dark:hover:bg-transparent font-semibold ${TABLE_STYLES.textSizes.header} ${TABLE_STYLES.headerColor} group-hover:text-foreground flex items-center justify-between w-full gap-1`}
        >
          <span>{config.label}</span>
          <SortArrow
            field={config.field}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        </Button>
        <div
          className={`absolute bottom-0 h-0.5 ${
            TABLE_STYLES.borderColor
          } ${getBorderStyle()}`}
        ></div>
      </TableHead>
    );
  }

  return (
    <TableHead
      className={`py-4 ${config.padding} ${config.width} ${
        config.textAlign || ""
      } relative`}
    >
      {config.label && (
        <span
          className={`font-semibold ${TABLE_STYLES.textSizes.header} ${TABLE_STYLES.headerColor}`}
        >
          {config.label}
        </span>
      )}
      <div
        className={`absolute bottom-0 h-0.5 ${
          TABLE_STYLES.borderColor
        } ${getBorderStyle()}`}
      ></div>
    </TableHead>
  );
};

interface TableHeaderRowProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export const TableHeaderRow = ({
  sortField,
  sortDirection,
  onSort,
}: TableHeaderRowProps) => (
  <>
    {TABLE_HEADERS.map((config, index) => (
      <TableHeaderCell
        key={config.field || index}
        config={config}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={onSort}
      />
    ))}
  </>
);
