import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-bold text-navy mb-1.5"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-3 py-2.5 border-2 rounded-lg text-sm text-navy border-border focus:border-red focus:outline-none ${className}`}
        {...props}
      />
      {error ? <p className="mt-1 text-sm text-red">{error}</p> : null}
    </div>
  );
}
