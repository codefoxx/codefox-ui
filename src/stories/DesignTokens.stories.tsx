import type { Meta, StoryObj } from "@storybook/react-vite";

const colors = [
  ["Background", "--codefox-color-background", "--codefox-color-foreground"],
  ["Surface", "--codefox-color-surface", "--codefox-color-foreground"],
  ["Primary", "--codefox-color-primary", "--codefox-color-primary-foreground"],
  ["Secondary", "--codefox-color-secondary", "--codefox-color-secondary-foreground"],
  ["Muted", "--codefox-color-muted", "--codefox-color-muted-foreground"],
  ["Danger", "--codefox-color-danger", "--codefox-color-danger-foreground"],
  ["Focus", "--codefox-color-focus", "--codefox-color-background"],
] as const;

function DesignTokens() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--codefox-space-lg)",
        minWidth: "min(52rem, 90vw)",
        color: "var(--codefox-color-foreground)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <header>
        <h1 style={{ margin: 0 }}>Codefox default theme</h1>
        <p style={{ color: "var(--codefox-color-muted-foreground)" }}>
          A visual reference for the semantic tokens used by Codefox UI components.
        </p>
      </header>

      <section
        aria-label="Semantic colors"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))",
          gap: "var(--codefox-space-md)",
        }}
      >
        {colors.map(([label, background, foreground]) => (
          <div
            key={label}
            style={{
              display: "grid",
              alignContent: "end",
              minHeight: "8rem",
              padding: "var(--codefox-space-md)",
              border: "1px solid var(--codefox-color-border)",
              borderRadius: "var(--codefox-radius-md)",
              background: `var(${background})`,
              color: `var(${foreground})`,
            }}
          >
            <strong>{label}</strong>
            <code style={{ fontSize: "0.75rem" }}>{background}</code>
          </div>
        ))}
      </section>

      <section aria-label="Spacing and radii">
        <h2>Spacing and radii</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--codefox-space-md)" }}>
          {["sm", "md", "lg", "full"].map((radius) => (
            <div
              key={radius}
              style={{
                display: "grid",
                placeItems: "center",
                width: "6rem",
                height: "6rem",
                border: "1px solid var(--codefox-color-border)",
                borderRadius: `var(--codefox-radius-${radius})`,
                background: "var(--codefox-color-secondary)",
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
