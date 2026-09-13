import type { AnchorHTMLAttributes, ReactElement } from "react";

import type { ButtonIconPosition, ButtonSize, ButtonVariant } from "../button/Button";
import "../button/button.css";

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style" | "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactElement;
  iconPosition?: ButtonIconPosition;
}

export function ButtonLink({
  children,
  href,
  icon,
  iconPosition = "start",
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  const renderedIcon = icon ? (
    <span className="cui-button__icon" aria-hidden="true">
      {icon}
    </span>
  ) : null;

  return (
    <a
      {...props}
      href={href}
      className="cui-button"
      data-variant={variant}
      data-size={size}
      data-icon-position={icon ? iconPosition : undefined}
    >
      {iconPosition === "start" && renderedIcon}
      <span className="cui-button__label">{children}</span>
      {iconPosition === "end" && renderedIcon}
    </a>
  );
}
