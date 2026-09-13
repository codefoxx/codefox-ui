import type { Meta, StoryObj } from "@storybook/react-vite";

import { PlaygroundHeader } from "./PlaygroundHeader";

const colors = [
  ["Background", "--cui-color-background", "--cui-color-foreground"],
  ["Surface", "--cui-color-surface", "--cui-color-foreground"],
  ["Primary", "--cui-color-primary", "--cui-color-primary-foreground"],
  ["Secondary", "--cui-color-secondary", "--cui-color-secondary-foreground"],
  ["Muted", "--cui-color-muted", "--cui-color-muted-foreground"],
  ["Danger", "--cui-color-danger", "--cui-color-danger-foreground"],
  ["Focus", "--cui-color-focus", "--cui-color-background"],
] as const;

const surfaceCombinations = [
  ["Surface on background", "--cui-color-background", "--cui-color-surface"],
  ["Secondary on background", "--cui-color-background", "--cui-color-secondary"],
  ["Muted on background", "--cui-color-background", "--cui-color-muted"],
] as const;

function DesignTokens() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--cui-space-lg)",
        minWidth: "min(52rem, 90vw)",
        color: "var(--cui-color-foreground)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <PlaygroundHeader />

      <header>
        <h1 style={{ margin: 0 }}>Codefox default theme</h1>
        <p style={{ color: "var(--cui-color-muted-foreground)" }}>
          A visual reference for the semantic tokens used by Codefox UI components.
        </p>
      </header>

      <section
        aria-label="Semantic colors"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))",
          gap: "var(--cui-space-md)",
        }}
      >
        {colors.map(([label, background, foreground]) => (
          <div
            key={label}
            style={{
              display: "grid",
              alignContent: "end",
              minHeight: "8rem",
              padding: "var(--cui-space-md)",
              border: "1px solid var(--cui-color-border)",
              borderRadius: "var(--cui-radius-md)",
              background: `var(${background})`,
              color: `var(${foreground})`,
            }}
          >
            <strong>{label}</strong>
            <code style={{ fontSize: "0.75rem" }}>{background}</code>
          </div>
        ))}
      </section>

      <section aria-label="Common surface combinations">
        <h2>Common surface combinations</h2>
        <p style={{ color: "var(--cui-color-muted-foreground)" }}>
          These combinations make low-contrast relationships visible before they reach a component.
        </p>
        <div style={{ display: "grid", gap: "var(--cui-space-md)" }}>
          {surfaceCombinations.map(([label, outer, inner]) => (
            <div
              key={label}
              style={{
                padding: "var(--cui-space-lg)",
                border: "1px solid var(--cui-color-border)",
                borderRadius: "var(--cui-radius-md)",
                background: `var(${outer})`,
              }}
            >
              <div
                style={{
                  padding: "var(--cui-space-lg)",
                  borderRadius: "var(--cui-radius-md)",
                  background: `var(${inner})`,
                }}
              >
                <strong>{label}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Spacing and radii">
        <h2>Spacing and radii</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--cui-space-md)" }}>
          {["sm", "md", "lg", "full"].map((radius) => (
            <div
              key={radius}
              style={{
                display: "grid",
                placeItems: "center",
                width: "6rem",
                height: "6rem",
                border: "1px solid var(--cui-color-border)",
                borderRadius: `var(--cui-radius-${radius})`,
                background: "var(--cui-color-secondary)",
              }}
            >
              {radius}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundation/Design Tokens",
  component: DesignTokens,
  tags: ["autodocs"],
} satisfies Meta<typeof DesignTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTheme: Story = {};
