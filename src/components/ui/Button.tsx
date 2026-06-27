import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    variant === "primary"
      ? "btn-red disabled:opacity-60 disabled:cursor-not-allowed"
      : "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold border-2 border-border text-navy hover:border-navy transition";

  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
