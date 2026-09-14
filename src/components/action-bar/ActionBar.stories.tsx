import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { PlaygroundHeader } from "../../stories/PlaygroundHeader";
import { ButtonLink } from "../button-link/ButtonLink";
import { Button } from "../button/Button";
import { ActionBar, type ActionBarItem } from "./ActionBar";

const onEdit = fn();

const mixedItems = [
  <Button key="edit" variant="ghost">Edit</Button>,
  <ButtonLink key="details" href="#details" variant="outline">Details</ButtonLink>,
  {
    type: "group",
    separator: true,
    items: [
      <Button key="duplicate" variant="secondary">Duplicate</Button>,
      <Button key="delete" variant="danger">Delete</Button>,
    ],
  },
] satisfies readonly ActionBarItem[];

const meta = {
  title: "Primitives/ActionBar",
  component: ActionBar,
  parameters: {
    layout: "padded",
  },
  args: {
    items: [
      <Button key="edit" onClick={onEdit}>Edit</Button>,
      <ButtonLink key="details" href="#details" variant="outline">Details</ButtonLink>,
      {
        type: "group",
        separator: true,
        items: [
          <Button key="duplicate" variant="secondary">Duplicate</Button>,
          <Button key="delete" variant="danger">Delete</Button>,
        ],
      },
    ],
  },
  argTypes: {
    items: {
      control: false,
    },
  },
} satisfies Meta<typeof ActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoFrame({
  children,
  dir,
  width,
}: {
  children: React.ReactNode;
  dir?: "ltr" | "rtl";
  width: string;
}) {
  return (
    <div
      dir={dir}
      style={{
        width,
        maxWidth: "100%",
        padding: "var(--cui-space-md)",
        border: "1px solid var(--cui-color-border)",
        borderRadius: "var(--cui-radius-md)",
        background: "var(--cui-color-surface)",
      }}
    >
      {children}
    </div>
  );
}

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "var(--cui-space-xl)",
        color: "var(--cui-color-foreground)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <PlaygroundHeader />

      <section>
        <h1 style={{ margin: 0 }}>ActionBar</h1>
        <p style={{ color: "var(--cui-color-muted-foreground)" }}>
          A reusable action layout that keeps grouping, separators, logical direction,
          and component-width responsiveness inside Codefox UI.
        </p>
      </section>

      <section aria-label="Mixed actions and groups">
        <h2>Mixed actions and groups</h2>
        <DemoFrame width="48rem">
          <ActionBar items={mixedItems} />
        </DemoFrame>
      </section>

      <section aria-label="Action groups">
        <h2>Groups with and without separators</h2>
        <div style={{ display: "grid", gap: "var(--cui-space-md)" }}>
          <DemoFrame width="40rem">
            <ActionBar
              items={[
                {
                  type: "group",
                  separator: true,
                  items: [
                    <Button key="previous" variant="outline">Previous</Button>,
                    <Button key="next">Next</Button>,
                  ],
                },
              ]}
            />
          </DemoFrame>
          <DemoFrame width="40rem">
            <ActionBar
              items={[
                {
                  type: "group",
                  items: [
                    <Button key="cancel" variant="ghost">Cancel</Button>,
                    <Button key="save">Save</Button>,
                  ],
                },
              ]}
            />
          </DemoFrame>
        </div>
      </section>

      <section aria-label="ActionBar direction">
        <h2>LTR and RTL</h2>
        <div style={{ display: "grid", gap: "var(--cui-space-md)" }}>
          <DemoFrame dir="ltr" width="36rem">
            <ActionBar items={mixedItems} />
          </DemoFrame>
          <DemoFrame dir="rtl" width="36rem">
            <ActionBar items={mixedItems} />
          </DemoFrame>
        </div>
      </section>

      <section aria-label="ActionBar responsive widths">
        <h2>Container widths</h2>
        <div style={{ display: "grid", gap: "var(--cui-space-md)" }}>
          <DemoFrame width="48rem">
            <ActionBar items={mixedItems} />
          </DemoFrame>
          <DemoFrame width="26rem">
            <ActionBar items={mixedItems} />
          </DemoFrame>
          <DemoFrame width="18rem">
            <ActionBar items={mixedItems} />
          </DemoFrame>
        </div>
      </section>
    </div>
  ),
};

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    onEdit.mockClear();

    const canvas = within(canvasElement);
    const edit = canvas.getByRole("button", { name: "Edit" });

    await userEvent.click(edit);
    await expect(onEdit).toHaveBeenCalledTimes(1);
    await expect(canvas.getByRole("link", { name: "Details" })).toHaveAttribute("href", "#details");
  },
};
