import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { TABLE_HEADERS, TABLE_STYLES } from "../table/config";

export const TransactionTableSkeleton = () => {
  return (
    <div className="bg-surface overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS.map((header, index) => (
              <TableHead
                key={index}
                className={`py-4 ${header.padding} ${header.width} ${
                  header.textAlign || ""
                } relative`}
              >
                <Skeleton className="h-4 w-16" />
                <div
                  className={`absolute bottom-0 h-0.5 ${
                    TABLE_STYLES.borderColor
                  } ${
                    header.padding.includes("pl-[18px]")
                      ? "left-[18px]"
                      : "left-[9px]"
                  } ${
                    header.padding.includes("pr-[18px]")
                      ? "right-[18px]"
                      : "right-[9px]"
                  }`}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="hover:bg-surface-muted/50 transition-colors border-b-0"
            >
              {TABLE_HEADERS.map((header, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={`py-4 ${header.padding} relative`}
                >
                  <Skeleton
                    className={`h-4 ${
                      cellIndex === 0
                        ? "w-20"
                        : cellIndex === 1
                        ? "w-24"
                        : cellIndex === 2
                        ? "w-16"
                        : "w-12"
                    }`}
                  />
                  {rowIndex !== 4 && (
                    <div
                      className={`absolute bottom-0 h-0.5 ${
                        TABLE_STYLES.borderColor
                      } ${
                        header.padding.includes("pl-[18px]")
                          ? "left-[18px]"
                          : "left-[9px]"
                      } ${
                        header.padding.includes("pr-[18px]")
                          ? "right-[18px]"
                          : "right-[9px]"
                      }`}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
