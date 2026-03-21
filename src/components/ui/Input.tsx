import cn from "clsx";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
}

export const Input = ({
  label,
  labelClassName,
  inputClassName,
  error,
  disabled,
  ...rest
}: InputProps) => {
  return (
    <div className={cn("flex flex-col gap-1", rest.className)}>
      {label && (
        <label
          htmlFor={rest.id}
          className={cn(
            "text-sm font-medium",
            labelClassName,
            "text-black dark:text-white",
          )}
        >
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        {...rest}
        className={cn(
          "border rounded p-2 focus:outline-none",
          "border-black dark:border-purple-500",
          "text-black dark:text-white",
          "focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500",
          error && "border-red-500 dark:border-red-400",
          inputClassName,
        )}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;
