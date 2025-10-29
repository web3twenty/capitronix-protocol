import React from "react";

interface ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "outline-secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  roundedClass?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      children,
      className = "",
      disabled,
      roundedClass = "rounded-lg",
      ...rest
    },
    ref
  ) => {
    const baseStyles = `inline-flex items-center justify-center font-medium cursor-pointer transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${roundedClass}`;

    const variantStyles = {
      primary: "bg-[#FFC200] text-black hover:bg-[#e6b100]",
      secondary:
        "bg-[#11B97E] text-gray-200 hover:bg-[#0e9465] focus:ring-gray-500",
      outline:
        "border-2 border-[#FFC200] text-[#FFC200] hover:bg-[#3a3b41] focus:ring-[#FFC200]",
      "outline-secondary":
        "border-2 border-[#11B97E] text-[#11B97E] hover:bg-[#0e9465] focus:ring-[#11B97E]",
      ghost: "text-[#FFC200] hover:bg-[#3a3b41] focus:ring-[#FFC200]",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    // Fixed padding: top/bottom = 11px, left/right = 12px
    const fixedPadding = "py-[11px] px-[12px]";

    const iconSizeStyles = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const LoadingSpinner = () => (
      <svg
        className={`animate-spin ${iconSizeStyles[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${fixedPadding}
          ${className}
        `}
        {...rest}
      >
        {loading && (
          <span className="mr-2">
            <LoadingSpinner />
          </span>
        )}

        {!loading && icon && iconPosition === "left" && (
          <span className={`mr-2 ${iconSizeStyles[size]}`}>{icon}</span>
        )}

        {loading ? "Loading..." : children}

        {!loading && icon && iconPosition === "right" && (
          <span className={`ml-2 ${iconSizeStyles[size]}`}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
