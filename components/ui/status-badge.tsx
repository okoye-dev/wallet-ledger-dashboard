import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Active" | "Credit" | "Debit";
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Active":
        return {
          bgColor: "bg-success-subtle",
          borderColor: "border-success/20",
          dotColor: "var(--success)",
        };
      case "Credit":
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          dotColor: "#2563eb",
        };
      case "Debit":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          dotColor: "#dc2626",
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          dotColor: "#6b7280",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant="secondary"
      className={cn(config.bgColor, config.borderColor, className)}
    >
      <div
        className="h-[6px] w-[6px] rounded-full"
        style={{ backgroundColor: config.dotColor }}
      />
      <p className="text-sm text-foreground">{status}</p>
    </Badge>
  );
};

export { StatusBadge };
