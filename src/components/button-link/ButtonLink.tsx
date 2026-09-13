import type { AnchorHTMLAttributes } from "react";

import type { ButtonSize, ButtonVariant } from "../button/Button";
import "../button/button.css";

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style" | "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      href={href}
      className="cui-button"
      data-variant={variant}
      data-size={size}
    />
  );
}
