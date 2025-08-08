import IconWrapper from "./IconWrapper";

interface WindowsProps {
  variant?: "default" | "ghost" | "outline";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Windows = ({
  variant = "ghost",
  className,
  onClick,
  disabled,
  ...props
}: WindowsProps) => {
  return (
    <IconWrapper
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label="Windows view"
      {...props}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3.25H3V10.25H10V3.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 3.25H14V10.25H21V3.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 14.25H14V21.25H21V14.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 14.25H3V21.25H10V14.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};
