import { Fragment, isValidElement, type ReactElement } from "react";

import "./action-bar.css";

export type ActionBarAction = ReactElement;

export interface ActionBarGroup {
  type: "group";
  items: readonly ActionBarAction[];
  separator?: boolean;
}

export type ActionBarItem = ActionBarAction | ActionBarGroup;

export interface ActionBarProps {
  items: readonly ActionBarItem[];
}

function renderAction(action: ActionBarAction, key: string) {
  return (
    <div className="cui-action-bar__item" key={action.key ?? key}>
      {action}
    </div>
  );
}

function renderGroup(group: ActionBarGroup, groupIndex: number) {
  return (
    <div className="cui-action-bar__group" key={`group-${groupIndex}`}>
      {group.items.map((action, actionIndex) => (
        <Fragment key={action.key ?? `group-${groupIndex}-action-${actionIndex}`}>
          {group.separator && actionIndex > 0 ? (
            <span className="cui-action-bar__separator" aria-hidden="true" />
          ) : null}
          {renderAction(action, `group-${groupIndex}-action-${actionIndex}`)}
        </Fragment>
      ))}
    </div>
  );
}

export function ActionBar({ items }: ActionBarProps) {
  return (
    <div className="cui-action-bar">
      <div className="cui-action-bar__layout">
        {items.map((item, index) =>
          isValidElement(item)
            ? renderAction(item, `action-${index}`)
            : renderGroup(item, index),
        )}
      </div>
    </div>
  );
}
