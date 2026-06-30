import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  dense?: boolean;
}

export function Input({ label, error, id, className = "", dense = false, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className={dense ? "" : "mb-4"}>
      <label
        htmlFor={inputId}
        className={`block font-bold text-navy ${dense ? "mb-[5px] text-[0.75rem]" : "mb-1.5 text-sm"}`}
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-lg text-navy transition focus:border-red focus:outline-none focus:shadow-[0_0_0_3px_rgba(218,48,79,0.1)] ${
          dense
            ? "border-[1.5px] border-border px-[13px] py-[11px] text-[0.9rem]"
            : "border-2 border-border px-3 py-2.5 text-sm"
        } ${error ? "border-red shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : ""} ${className}`}
        {...props}
      />
      {error ? <p className={`text-red ${dense ? "mt-1 text-[0.72rem]" : "mt-1 text-sm"}`}>{error}</p> : null}
    </div>
  );
}
