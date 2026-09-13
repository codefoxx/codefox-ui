// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { ButtonLink } from "../src/components/button-link/ButtonLink";

afterEach(cleanup);

describe("ButtonLink", () => {
  it("renders a native anchor with the default visual treatment", () => {
    render(<ButtonLink href="/meetups">View meetups</ButtonLink>);

    const link = screen.getByRole("link", { name: "View meetups" });

    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/meetups");
    expect(link.getAttribute("data-variant")).toBe("primary");
    expect(link.getAttribute("data-size")).toBe("md");
  });

  it.each(["primary", "secondary", "danger", "outline", "ghost"] as const)(
    "supports the %s variant",
    (variant) => {
      render(<ButtonLink href={`#${variant}`} variant={variant}>{variant}</ButtonLink>);

      expect(screen.getByRole("link", { name: variant }).getAttribute("data-variant")).toBe(variant);
    },
  );

  it.each(["sm", "md", "lg"] as const)("supports the %s size", (size) => {
    render(<ButtonLink href={`#${size}`} size={size}>{size}</ButtonLink>);

    expect(screen.getByRole("link", { name: size }).getAttribute("data-size")).toBe(size);
  });

  it("renders an icon at logical start by default", () => {
    render(
      <ButtonLink href="/docs" icon={<span data-testid="icon">icon</span>}>
        Documentation
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Documentation" });
    const icon = screen.getByTestId("icon").parentElement;
    const label = link.querySelector(".cui-button__label");

    expect(link.getAttribute("data-icon-position")).toBe("start");
    expect(icon?.nextElementSibling).toBe(label);
  });

  it("renders an icon at logical end and inherits RTL direction", () => {
    render(
      <div dir="rtl">
        <ButtonLink href="/docs" icon={<span data-testid="icon">icon</span>} iconPosition="end">
          Documentation
        </ButtonLink>
      </div>,
    );

    const link = screen.getByRole("link", { name: "Documentation" });
    const icon = screen.getByTestId("icon").parentElement;
    const label = link.querySelector(".cui-button__label");

    expect(link.getAttribute("data-icon-position")).toBe("end");
    expect(label?.nextElementSibling).toBe(icon);
    expect(link.closest("[dir]")?.getAttribute("dir")).toBe("rtl");
  });

  it("forwards native anchor attributes", () => {
    render(
      <ButtonLink
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
        download="example.txt"
      >
        Example
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Example" });

    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noreferrer");
    expect(link.getAttribute("download")).toBe("example.txt");
  });

  it("receives keyboard focus as a native link", async () => {
    const user = userEvent.setup();

    render(<ButtonLink href="/meetups">View meetups</ButtonLink>);

    const link = screen.getByRole("link", { name: "View meetups" });

    await user.tab();
    expect(document.activeElement).toBe(link);
  });
});
