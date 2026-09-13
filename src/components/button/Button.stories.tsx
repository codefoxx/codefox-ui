import type { Meta, StoryObj } from "@storybook/react-vite";

import { PlaygroundHeader } from "../../stories/PlaygroundHeader";
import { Button } from "./Button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "padded",
  },
  args: {
    children: "Button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
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
        <h1 style={{ margin: 0 }}>Button</h1>
        <p style={{ color: "var(--cui-color-muted-foreground)" }}>
          The first Codefox UI primitive. Compare variants, sizes, focus, and disabled states here before the API is stabilized.
        </p>
      </section>

      <section aria-label="Button variants">
        <h2>Variants</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section aria-label="Button sizes">
        <h2>Sizes</h2>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section aria-label="Disabled buttons">
        <h2>Disabled</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
          <Button disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="danger" disabled>Danger</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="ghost" disabled>Ghost</Button>
        </div>
      </section>

      <section
        aria-label="Buttons on surfaces"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
          gap: "var(--cui-space-md)",
        }}
      >
        {[
          ["Background", "var(--cui-color-background)"],
          ["Surface", "var(--cui-color-surface)"],
          ["Muted", "var(--cui-color-muted)"],
        ].map(([label, background]) => (
          <div
            key={label}
            style={{
              display: "grid",
              gap: "var(--cui-space-md)",
              padding: "var(--cui-space-lg)",
              border: "1px solid var(--cui-color-border)",
              borderRadius: "var(--cui-radius-md)",
              background,
            }}
          >
            <strong>{label}</strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--cui-space-sm)" }}>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  ),
};

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
