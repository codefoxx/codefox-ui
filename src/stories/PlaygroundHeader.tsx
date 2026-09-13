import codefoxLogo from "../assets/codefox-logo.png";

export function PlaygroundHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--cui-space-md)",
        paddingBottom: "var(--cui-space-md)",
        borderBottom: "1px solid var(--cui-color-border)",
      }}
    >
      <img src={codefoxLogo} alt="Codefox" width={44} height={50} />
      <div>
        <div style={{ fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.1 }}>Codefox UI</div>
        <div style={{ marginTop: "0.25rem", color: "var(--cui-color-muted-foreground)" }}>
          Component playground &amp; design system
        </div>
      </div>
    </header>
  );
}
