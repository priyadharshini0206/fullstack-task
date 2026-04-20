import React, { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", isLoading, children, ...props },
    ref,
  ) => {
    const base = "rounded px-4 py-2 font-medium";

    const variants = {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-white",
      ghost: "bg-transparent border",
      danger: "bg-red-500 text-white",
    };

    const sizes = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    
    const disabledClass =
      isLoading || props.disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${disabledClass}`} 
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  },
);
