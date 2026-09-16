import {
  Fragment,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type RefObject,
} from "react";

import {
  ActionBar,
  type ActionBarItem,
  type ActionBarProps,
} from "../action-bar/ActionBar";
import "./card.css";

type CardElementProps<T extends HTMLElement> = Omit<HTMLAttributes<T>, "className" | "style">;

type CardActionMode = "wide" | "compact" | "overflow";

const CompactVisibleActionCount = 2;
const CompactMaxWidth = 40 * 16;
const OverflowOnlyMaxWidth = 24 * 16;

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

function flattenActions(items: readonly ActionBarItem[]): readonly ReactElement[] {
  return items.flatMap(item => isValidElement(item) ? [item] : item.items);
}

function useCardActionMode(actionsRef: RefObject<HTMLDivElement | null>) {
  const [mode, setMode] = useState<CardActionMode>("wide");

  useLayoutEffect(() => {
    const actions = actionsRef.current;
    const card = actions?.closest<HTMLElement>(".cui-card");

    if (!card || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateMode = (width: number) => {
      setMode(width <= OverflowOnlyMaxWidth
        ? "overflow"
        : width <= CompactMaxWidth
          ? "compact"
          : "wide");
    };

    updateMode(card.getBoundingClientRect().width);

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        updateMode(entry.contentRect.width);
      }
    });

    observer.observe(card);
    return () => observer.disconnect();
  }, [actionsRef]);

  return mode;
}

function CompactActions({ actions }: { actions: readonly ReactElement[] }) {
  return (
    <div className="cui-card__compact-actions">
      {actions.map((action, index) => (
        <div className="cui-card__compact-action" key={action.key ?? `compact-action-${index}`}>
          {action}
        </div>
      ))}
    </div>
  );
}

function OverflowMenu({ actions }: { actions: readonly ReactElement[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  if (actions.length === 0) {
    return null;
  }

  const closeAfterAction = (target: EventTarget | null) => {
    if (!(target instanceof Element) || !target.closest("button, a")) {
      return;
    }

    detailsRef.current?.removeAttribute("open");
  };

  return (
    <details ref={detailsRef} className="cui-card__overflow">
      <summary className="cui-card__overflow-trigger" aria-label="More actions">
        <span aria-hidden="true">⋮</span>
      </summary>
      <div className="cui-card__overflow-panel" onClick={event => closeAfterAction(event.target)}>
        {actions.map((action, index) => (
          <Fragment key={action.key ?? `overflow-action-${index}`}>
            <div className="cui-card__overflow-item">{action}</div>
          </Fragment>
        ))}
      </div>
    </details>
  );
}

/** Place as the last direct child of CardHeader; the header owns its layout. */
export function CardActions({ items }: CardActionsProps) {
  const actionsRef = useRef<HTMLDivElement>(null);
  const mode = useCardActionMode(actionsRef);
  const actions = flattenActions(items);

  if (actions.length === 0) {
    return null;
  }

  const visibleActions = mode === "compact"
    ? actions.slice(0, CompactVisibleActionCount)
    : actions;
  const overflowActions = mode === "compact"
    ? actions.slice(CompactVisibleActionCount)
    : mode === "overflow"
      ? actions
      : [];

  return (
    <div ref={actionsRef} className="cui-card__actions" data-mode={mode}>
      {mode === "wide" ? <ActionBar items={items} /> : null}
      {mode === "compact" ? <CompactActions actions={visibleActions} /> : null}
      <OverflowMenu actions={overflowActions} />
    </div>
  );
}
