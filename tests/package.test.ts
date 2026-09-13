import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as {
  name: string;
  peerDependencies?: Record<string, string>;
};

describe("package metadata", () => {
  it("uses the public Codefox UI package name", () => {
    expect(packageJson.name).toBe("@codefoxpro/ui");
  });

  it("keeps React as a peer dependency", () => {
    expect(packageJson.peerDependencies).toHaveProperty("react");
    expect(packageJson.peerDependencies).toHaveProperty("react-dom");
  });
});
