import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Active" | "Credit" | "Debit";
  className?: string;
  size?: "sm" | "md";
}

const StatusBadge = ({ status, className, size = "md" }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Active":
        return {
          bgColor: "bg-success-subtle",
          dotColor: "var(--success)",
        };
      case "Credit":
        return {
          bgColor: "bg-[#34616f]/[0.09]", // 9% opacity of #34616F
          dotColor: "var(--success)", // Using CSS variable for #087A2E
        };
      case "Debit":
        return {
          bgColor: "bg-[#34616f]/[0.09]", // 9% opacity of #34616F
          dotColor: "var(--danger)", // Using CSS variable for #C6381B
        };
      default:
        return {
          bgColor: "bg-gray-50",
          dotColor: "#6b7280",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant="secondary" className={cn(config.bgColor, className)}>
      <div
        className="h-[6px] w-[6px] rounded-full"
        style={{ backgroundColor: config.dotColor }}
      />
      <p
        className={cn(
          "text-sm text-foreground",
          size === "sm" && "text-[10px]"
        )}
      >
        {status}
      </p>
    </Badge>
  );
};

export { StatusBadge };
