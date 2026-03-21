"use client";

import cn from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "alternate"
  | "ghost"
  | "destructive";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "full";
  loading?: boolean;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  backgroundColor?: string;
  border?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "dark:bg-primary text-primary-foreground hover:bg-primary/60 dark:hover:bg-primary/80",
  secondary:
    "bg-primary text-white  hover:bg-primary/60 dark:hover:bg-secondary/80",
  alternate: "bg-black hover:bg-purple-600 dark:hover:bg-purple",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
  destructive: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-700",
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
  full: "w-full px-6 py-3 text-base rounded-xl",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    loading = false,
    iconBefore,
    iconAfter,
    width,
    height,
    borderRadius,
    backgroundColor,
    border,
    disabled = false,
    style = {},
    ...rest
  } = props;

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        "flex items-center justify-center gap-2 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor,
        border,
        ...style,
      }}
      {...rest}
    >
      {iconBefore && <span className="flex">{iconBefore}</span>}
      {children}
      {iconAfter && <span className="flex">{iconAfter}</span>}
    </button>
  );
}
