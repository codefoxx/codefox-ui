// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ActionBar, Button, ButtonLink, Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter, CardActions, type CardActionsProps, type CardProps,
} from "../src";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function useMeasuredCardWidth(width: number) {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    x: 0,
    y: 0,
    width,
    height: 100,
    top: 0,
    right: width,
    bottom: 100,
    left: 0,
    toJSON: () => ({}),
  });

  class TestResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  vi.stubGlobal("ResizeObserver", TestResizeObserver);
}

describe("Card public composition", () => {
  it("renders named sections and forwards native attributes", () => {
    render(<Card role="region" aria-labelledby="title" aria-describedby="description" id="card">
      <CardHeader><div><CardTitle id="title">Project</CardTitle>
        <CardDescription id="description">Project details</CardDescription></div></CardHeader>
      <CardContent><label>Project name<input defaultValue="Codefox" /></label></CardContent>
      <CardFooter><small>Updated today</small><Button>Save</Button></CardFooter>
    </Card>);
    expect(screen.getByRole("region", { name: "Project" }).id).toBe("card");
    expect(screen.getByRole("heading", { name: "Project", level: 3 }).id).toBe("title");
    expect(screen.getByText("Project details").id).toBe("description");
    expect(screen.getByRole("textbox", { name: "Project name" })).toBeTruthy();
    expect(screen.getByText("Updated today")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });

  it("supports omitted sections, direct header text and a freely composed footer", () => {
    render(<>
      <Card><CardContent>Content alone</CardContent></Card>
      <Card><CardHeader><CardTitle>Title alone</CardTitle><CardDescription>Description</CardDescription></CardHeader></Card>
      <Card><CardFooter><span>Footer label</span><ActionBar items={[<Button key="save">Save</Button>]} /></CardFooter></Card>
    </>);
    expect(screen.getByText("Content alone")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Title alone" })).toBeTruthy();
    expect(screen.getByText("Footer label")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
    expect(screen.queryByRole("toolbar")).toBeNull();
  });

  it("delegates typed actions and groups while preserving keyboard and native behavior", async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<Card><CardHeader>
      <CardTitle>Project</CardTitle>
      <CardActions items={[
        <Button key="edit" onClick={onEdit}>Edit</Button>,
        { type: "group", separator: true, items: [
          <ButtonLink key="details" href="/details">Details</ButtonLink>,
          <Button key="delete" disabled>Delete</Button>,
        ] },
      ]} />
    </CardHeader></Card>);
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Edit" }));
    await user.keyboard("{Enter}");
    expect(onEdit).toHaveBeenCalledTimes(1);
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("link", { name: "Details" }));
    expect(screen.getByRole("link").getAttribute("href")).toBe("/details");
    expect((screen.getByRole("button", { name: "Delete" }) as HTMLButtonElement).disabled).toBe(true);
    expect(container.querySelectorAll(".cui-action-bar")).toHaveLength(1);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
  });

  it("moves actions from the end into overflow at compact card width", () => {
    useMeasuredCardWidth(36 * 16);

    const { container } = render(<Card><CardHeader>
      <CardTitle>Project</CardTitle>
      <CardActions items={[
        <Button key="edit">Edit</Button>,
        <ButtonLink key="details" href="/details">Details</ButtonLink>,
        <Button key="delete" variant="danger">Delete</Button>,
      ]} />
    </CardHeader></Card>);

    const actions = container.querySelector(".cui-card__actions");
    expect(actions?.getAttribute("data-mode")).toBe("compact");
    expect(container.querySelectorAll(".cui-card__compact-action")).toHaveLength(2);
    expect(container.querySelector(".cui-card__compact-actions")?.textContent).toContain("Edit");
    expect(container.querySelector(".cui-card__compact-actions")?.textContent).toContain("Details");
    expect(container.querySelector(".cui-card__compact-actions")?.textContent).not.toContain("Delete");
    expect(container.querySelector(".cui-card__overflow-panel")?.textContent).toContain("Delete");
  });

  it("moves every action into overflow at narrow card width", () => {
    useMeasuredCardWidth(18 * 16);

    const { container } = render(<Card><CardHeader>
      <CardTitle>Project</CardTitle>
      <CardActions items={[
        <Button key="edit">Edit</Button>,
        <ButtonLink key="details" href="/details">Details</ButtonLink>,
        <Button key="delete" variant="danger">Delete</Button>,
      ]} />
    </CardHeader></Card>);

    const actions = container.querySelector(".cui-card__actions");
    expect(actions?.getAttribute("data-mode")).toBe("overflow");
    expect(container.querySelector(".cui-card__compact-actions")).toBeNull();
    expect(container.querySelector(".cui-action-bar")).toBeNull();
    expect(container.querySelector(".cui-card__overflow-panel")?.textContent).toContain("Edit");
    expect(container.querySelector(".cui-card__overflow-panel")?.textContent).toContain("Details");
    expect(container.querySelector(".cui-card__overflow-panel")?.textContent).toContain("Delete");
  });

  it.each(["ltr", "rtl"])("inherits %s without per-component direction props", (dir) => {
    const { container } = render(<div dir={dir}><Card><CardHeader>
      <CardTitle>Project</CardTitle><CardActions items={[]} />
    </CardHeader><CardContent>Content</CardContent><CardFooter>Footer</CardFooter></Card></div>);
    expect(container.querySelectorAll("[dir]")).toHaveLength(1);
    expect(screen.getByRole("heading").closest("[dir]")?.getAttribute("dir")).toBe(dir);
    expect(screen.queryByRole("button")).toBeNull();
  });
});

// Compile-time public API boundaries; checked by npm run typecheck.
const validActions: CardActionsProps = { items: [{ type: "group", items: [<Button key="save">Save</Button>] }] };
// @ts-expect-error CardActions positioning belongs to CardHeader.
const positionedActions: CardActionsProps = { items: [], style: { position: "absolute" } };
// @ts-expect-error CardActions delegates items, not arbitrary children.
const arbitraryActions: CardActionsProps = { items: [], children: "actions" };
// @ts-expect-error Card styling stays internal.
const styledCard: CardProps = { className: "custom-card" };
void [validActions, positionedActions, arbitraryActions, styledCard];
