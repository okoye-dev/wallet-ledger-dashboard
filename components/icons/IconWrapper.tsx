"use client";

import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface IconWrapperProps {
  children: ReactNode;
  variant?: "default" | "ghost" | "outline" | "bordered";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

const IconWrapper = forwardRef<HTMLDivElement, IconWrapperProps>(
  (
    {
      children,
      variant = "ghost",
      size = "md",
      className,
      onClick,
      disabled = false,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default:
        "text-foreground hover:text-text-green hover:bg-hover-text-green/10",
      ghost:
        "text-foreground hover:text-text-green hover:bg-hover-text-green/10",
      outline:
        "text-foreground border border-card-border hover:text-text-green hover:border-text-green hover:bg-hover-text-green/5",
      bordered:
        "text-foreground border border-[#49656E]/20 hover:text-text-green hover:border-text-green hover:bg-hover-text-green/5",
    };

    const sizeClasses = {
      sm: "h-6 w-6",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    };

    const getBorderRadius = () => {
      return variant === "bordered" ? "rounded-2xl" : "rounded-lg";
    };

    const baseClasses = cn(
      "inline-flex items-center justify-center transition-all duration-200",
      getBorderRadius(),
      sizeClasses[size],
      variantClasses[variant],
      onClick && !disabled && "cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed",
      className
    );

    return (
      <div
        ref={ref}
        className={baseClasses}
        onClick={!disabled ? onClick : undefined}
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onKeyDown={
          onClick && !disabled
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconWrapper.displayName = "IconWrapper";

export default IconWrapper;
