import IconWrapper from "./IconWrapper";

interface MenuBarsProps {
  variant?: "default" | "ghost" | "outline";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const MenuBars = ({
  variant = "ghost",
  className,
  onClick,
  disabled,
  ...props
}: MenuBarsProps) => {
  return (
    <IconWrapper
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label="Menu"
      {...props}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12.25H21M3 6.25H21M3 18.25H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};
