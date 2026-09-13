import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { PlaygroundHeader } from "../../stories/PlaygroundHeader";
import { ButtonLink } from "./ButtonLink";

function DemoIcon() {
  return <span aria-hidden="true">↗</span>;
}

const meta = {
  title: "Primitives/ButtonLink",
  component: ButtonLink,
  parameters: { layout: "padded" },
  args: {
    children: "View meetups",
    href: "#meetups",
    icon: <DemoIcon />,
    onClick: fn(),
  },
  argTypes: {
    icon: {
      control: false,
    },
    iconPosition: {
      control: "select",
      options: ["start", "end"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    target: {
      control: "select",
      options: [undefined, "_self", "_blank"],
    },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--cui-space-xl)", color: "var(--cui-color-foreground)", fontFamily: "system-ui, sans-serif" }}>
      <PlaygroundHeader />
      <section>
        <h1 style={{ margin: 0 }}>ButtonLink</h1>
        <p style={{ color: "var(--cui-color-muted-foreground)" }}>
          Navigation styled like a button while preserving native anchor semantics.
        </p>
      </section>
      <section aria-label="ButtonLink variants">
        <h2>Variants</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
          <ButtonLink href="#primary">Primary</ButtonLink>
          <ButtonLink href="#secondary" variant="secondary">Secondary</ButtonLink>
          <ButtonLink href="#danger" variant="danger">Danger</ButtonLink>
          <ButtonLink href="#outline" variant="outline">Outline</ButtonLink>
          <ButtonLink href="#ghost" variant="ghost">Ghost</ButtonLink>
        </div>
      </section>
      <section aria-label="ButtonLink sizes">
        <h2>Sizes</h2>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
          <ButtonLink href="#small" size="sm">Small</ButtonLink>
          <ButtonLink href="#medium" size="md">Medium</ButtonLink>
          <ButtonLink href="#large" size="lg">Large</ButtonLink>
        </div>
      </section>
      <section aria-label="ButtonLink icons">
        <h2>Icons and direction</h2>
        <div style={{ display: "grid", gap: "var(--cui-space-md)" }}>
          <div dir="ltr" style={{ display: "flex", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
            <ButtonLink href="#ltr-start" icon={<DemoIcon />}>LTR start</ButtonLink>
            <ButtonLink href="#ltr-end" icon={<DemoIcon />} iconPosition="end" variant="secondary">LTR end</ButtonLink>
          </div>
          <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
            <ButtonLink href="#rtl-start" icon={<DemoIcon />}>RTL start</ButtonLink>
            <ButtonLink href="#rtl-end" icon={<DemoIcon />} iconPosition="end" variant="secondary">RTL end</ButtonLink>
          </div>
        </div>
      </section>
      <section aria-label="ButtonLink link attributes">
        <h2>Link attributes</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
          <ButtonLink href="https://example.com" target="_blank" rel="noreferrer">Open in new tab</ButtonLink>
          <ButtonLink href="/example.txt" download variant="outline">Download</ButtonLink>
        </div>
      </section>
    </div>
  ),
};

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: String(args.children) });

    await userEvent.tab();
    await expect(link).toHaveFocus();
    await expect(link).toHaveAttribute("href", String(args.href));
  },
};
