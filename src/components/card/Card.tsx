import type { HTMLAttributes } from "react";

import { ActionBar, type ActionBarProps } from "../action-bar/ActionBar";
import "./card.css";

type CardElementProps<T extends HTMLElement> = Omit<HTMLAttributes<T>, "className" | "style">;

export type CardProps = CardElementProps<HTMLDivElement>;
export type CardHeaderProps = CardElementProps<HTMLDivElement>;
export type CardTitleProps = CardElementProps<HTMLHeadingElement>;
export type CardDescriptionProps = CardElementProps<HTMLParagraphElement>;
export type CardContentProps = CardElementProps<HTMLDivElement>;
export type CardFooterProps = CardElementProps<HTMLDivElement>;
export type CardActionsProps = ActionBarProps;

export function Card(props: CardProps) {
  return <div {...props} className="cui-card" />;
}

export function CardHeader(props: CardHeaderProps) {
  return <div {...props} className="cui-card__header" />;
}

export function CardTitle(props: CardTitleProps) {
  return <h3 {...props} className="cui-card__title" />;
}

export function CardDescription(props: CardDescriptionProps) {
  return <p {...props} className="cui-card__description" />;
}

export function CardContent(props: CardContentProps) {
  return <div {...props} className="cui-card__content" />;
}

export function CardFooter(props: CardFooterProps) {
  return <div {...props} className="cui-card__footer" />;
}

/** Place as the last direct child of CardHeader; the header owns its layout. */
export function CardActions({ items }: CardActionsProps) {
  return <div className="cui-card__actions"><ActionBar items={items} /></div>;
}
