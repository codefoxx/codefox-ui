// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ActionBar } from "../src/components/action-bar/ActionBar";
import { ButtonLink } from "../src/components/button-link/ButtonLink";
import { Button } from "../src/components/button/Button";

afterEach(cleanup);

describe("ActionBar", () => {
  it("renders individual actions and groups in source order", () => {
    render(
      <ActionBar
        items={[
          <Button key="edit">Edit</Button>,
          <ButtonLink key="details" href="/details">Details</ButtonLink>,
          {
            type: "group",
            items: [<Button key="delete">Delete</Button>],
          },
        ]}
      />,
    );

    const edit = screen.getByRole("button", { name: "Edit" });
    const details = screen.getByRole("link", { name: "Details" });
    const remove = screen.getByRole("button", { name: "Delete" });

    expect(edit.compareDocumentPosition(details) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(details.compareDocumentPosition(remove) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("renders separators only between items in a separated group", () => {
    const { container } = render(
      <ActionBar
        items={[
          {
            type: "group",
            separator: true,
            items: [
              <Button key="one">One</Button>,
              <Button key="two">Two</Button>,
              <Button key="three">Three</Button>,
            ],
          },
        ]}
      />,
    );

    const group = container.querySelector(".cui-action-bar__group");
    const separators = group?.querySelectorAll(".cui-action-bar__separator") ?? [];

    expect(separators).toHaveLength(2);
    expect(group?.firstElementChild?.classList.contains("cui-action-bar__separator")).toBe(false);
    expect(group?.lastElementChild?.classList.contains("cui-action-bar__separator")).toBe(false);
  });

  it("does not render separators for an unseparated group", () => {
    const { container } = render(
      <ActionBar
        items={[
          {
            type: "group",
            items: [
              <Button key="one">One</Button>,
              <Button key="two">Two</Button>,
            ],
          },
        ]}
      />,
    );

    expect(container.querySelectorAll(".cui-action-bar__separator")).toHaveLength(0);
  });

  it("preserves the native semantics of contained controls", () => {
    render(
      <ActionBar
        items={[
          <Button key="save" type="submit">Save</Button>,
          <ButtonLink key="settings" href="/settings">Settings</ButtonLink>,
        ]}
      />,
    );

    expect(screen.getByRole("button", { name: "Save" }).getAttribute("type")).toBe("submit");
    expect(screen.getByRole("link", { name: "Settings" }).getAttribute("href")).toBe("/settings");
    expect(screen.queryByRole("toolbar")).toBeNull();
  });

  it("inherits writing direction instead of overriding it", () => {
    const { container } = render(
      <div dir="rtl">
        <ActionBar items={[<Button key="edit">Edit</Button>]} />
      </div>,
    );

    const actionBar = container.querySelector(".cui-action-bar");

    expect(actionBar?.hasAttribute("dir")).toBe(false);
    expect(actionBar?.closest('[dir="rtl"]')).not.toBeNull();
  });
});
