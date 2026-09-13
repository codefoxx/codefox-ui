import type { ButtonHTMLAttributes, ReactElement } from "react";

import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonIconPosition = "start" | "end";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactElement;
  iconPosition?: ButtonIconPosition;
}

export function Button({
  children,
  icon,
  iconPosition = "start",
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  const renderedIcon = icon ? (
    <span className="cui-button__icon" aria-hidden="true">
      {icon}
    </span>
  ) : null;

  return (
    <button
      {...props}
      type={type}
      className="cui-button"
      data-variant={variant}
      data-size={size}
      data-icon-position={icon ? iconPosition : undefined}
    >
      {iconPosition === "start" && renderedIcon}
      <span className="cui-button__label">{children}</span>
      {iconPosition === "end" && renderedIcon}
    </button>
  );
}
