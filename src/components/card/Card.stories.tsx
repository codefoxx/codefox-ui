import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { PlaygroundHeader } from "../../stories/PlaygroundHeader";
import { Button } from "../button/Button";
import { ButtonLink } from "../button-link/ButtonLink";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardActions,
} from "./Card";

const onEdit = fn();

type DemoProps = {
  dir: "ltr" | "rtl";
  width: number;
  actions: boolean;
  header: boolean;
  content: boolean;
  footer: boolean;
  title: string;
  description: string;
};

function Demo({ dir, width, actions, header, content, footer, title, description }: DemoProps) {
  return (
    <div dir={dir} style={{ inlineSize: `${width}rem`, maxInlineSize: "100%", fontFamily: "system-ui, sans-serif" }}>
      <Card>
        {header && <CardHeader>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {actions && <CardActions items={[
            <Button key="edit" onClick={onEdit}>Edit</Button>,
            { type: "group", separator: true, items: [
              <ButtonLink key="details" href="#details" variant="outline">Details</ButtonLink>,
              <Button key="delete" variant="danger" disabled>Delete</Button>,
            ] },
          ]} />}
        </CardHeader>}
        {content && <CardContent>Compose any application content here.</CardContent>}
        {footer && <CardFooter><small>Updated recently · Footer content is freely composable.</small></CardFooter>}
      </Card>
    </div>
  );
}

const defaults: DemoProps = {
  dir: "ltr", width: 64, actions: true, header: true, content: true, footer: true,
  title: "Project", description: "Manage the project and its details.",
};

const meta = {
  title: "Primitives/Card",
  component: Demo,
  parameters: { layout: "padded" },
  args: defaults,
  argTypes: {
    dir: { control: "inline-radio", options: ["ltr", "rtl"] },
    width: { control: { type: "range", min: 16, max: 80, step: 1 } },
    actions: { control: "boolean" },
    header: { control: "boolean" },
    content: { control: "boolean" },
    footer: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<DemoProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--cui-space-xl)", fontFamily: "system-ui, sans-serif" }}>
      <PlaygroundHeader />
      <h1>Card</h1>
      {(["ltr", "rtl"] as const).map((dir) => (
        <section key={dir} aria-label={`${dir.toUpperCase()} card widths`}>
          <h2>{dir.toUpperCase()} · Header, content and footer</h2>
          <div style={{ display: "grid", gap: "var(--cui-space-lg)" }}>
            {[64, 36, 18].map((width) => <Demo key={width} {...defaults} dir={dir} width={width} />)}
            <Demo {...defaults} dir={dir} actions={false} />
          </div>
        </section>
      ))}
      <section aria-label="Optional sections" style={{ display: "grid", gap: "var(--cui-space-lg)" }}>
        <h2>Optional sections and unwrapped header text</h2>
        <Card>
          <CardHeader>
            <CardTitle>Header only</CardTitle>
            <CardDescription>No content, footer or actions required.</CardDescription>
          </CardHeader>
        </Card>
        <Card><CardContent>Content only</CardContent></Card>
        <Card><CardFooter><Button variant="secondary">Freely composed footer</Button></CardFooter></Card>
      </section>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Real browser geometry verifies inherited direction and both containers independently.
    for (const dir of ["ltr", "rtl"]) {
      const section = within(canvasElement).getByRole("region", { name: `${dir.toUpperCase()} card widths` });
      const cards = section.querySelectorAll(".cui-card");
      for (const [index, card] of Array.from(cards).entries()) {
        const header = card.querySelector(".cui-card__header")!;
        await expect(getComputedStyle(header).direction).toBe(dir);
        if (index === 3) {
          await expect(card.querySelector(".cui-card__actions")).toBeNull();
          continue;
        }
        const text = header.firstElementChild!.getBoundingClientRect();
        const actions = card.querySelector(".cui-card__actions")!.getBoundingClientRect();
        if (card.getBoundingClientRect().width > 640) {
          await expect(Math.abs(text.top - actions.top)).toBeLessThan(1);
          await expect(dir === "ltr" ? actions.left >= text.right : actions.right <= text.left).toBe(true);
        } else {
          await expect(actions.top).toBeGreaterThanOrEqual(text.bottom);
        }
        const layout = card.querySelector(".cui-action-bar__layout")!;
        await expect(getComputedStyle(layout).flexDirection).toBe(actions.width <= 384 ? "column" : "row");
        await expect(card.scrollWidth).toBeLessThanOrEqual(card.clientWidth + 1);
      }
    }
  },
};

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    if (!args.header || !args.actions) return;
    onEdit.mockClear();
    const canvas = within(canvasElement);
    const edit = canvas.getByRole("button", { name: "Edit" });
    edit.focus();
    await userEvent.keyboard("{Enter}");
    await expect(onEdit).toHaveBeenCalledTimes(1);
    await expect(canvas.getByRole("link", { name: "Details" })).toHaveAttribute("href", "#details");
    await expect(canvas.getByRole("button", { name: "Delete" })).toBeDisabled();
  },
};
