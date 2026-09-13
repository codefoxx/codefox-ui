import { describe, expect, it } from "vitest";

import { themeTokens } from "../src/styles/tokens";

describe("themeTokens", () => {
  it("uses the Codefox namespace for every CSS custom property", () => {
    const tokenNames = Object.values(themeTokens).flatMap((group) => Object.values(group));

    expect(tokenNames).not.toHaveLength(0);
    expect(tokenNames.every((token) => token.startsWith("--codefox-"))).toBe(true);
    expect(new Set(tokenNames).size).toBe(tokenNames.length);
  });
});
