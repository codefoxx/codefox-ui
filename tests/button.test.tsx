// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "../src/components/button/Button";

afterEach(cleanup);

describe("Button", () => {
  it("defaults to a primary medium button that does not submit forms", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });

    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("data-variant")).toBe("primary");
    expect(button.getAttribute("data-size")).toBe("md");
  });

  it.each(["primary", "secondary", "danger", "outline", "ghost"] as const)(
    "supports the %s variant",
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);

      expect(screen.getByRole("button", { name: variant }).getAttribute("data-variant")).toBe(variant);
    },
  );

  it.each(["sm", "md", "lg"] as const)("supports the %s size", (size) => {
    render(<Button size={size}>{size}</Button>);

    expect(screen.getByRole("button", { name: size }).getAttribute("data-size")).toBe(size);
  });

  it("forwards native button attributes", () => {
    render(<Button aria-label="Create meetup" name="action" value="create" />);

    const button = screen.getByRole("button", { name: "Create meetup" });

    expect(button.getAttribute("name")).toBe("action");
    expect(button.getAttribute("value")).toBe("create");
  });

  it("can explicitly be used as a submit button", () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole("button", { name: "Submit" }).getAttribute("type")).toBe("submit");
  });

  it("receives keyboard focus and activates with Enter", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Continue</Button>);

    const button = screen.getByRole("button", { name: "Continue" });

    await user.tab();
    expect(document.activeElement).toBe(button);

    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not activate when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button.hasAttribute("disabled")).toBe(true);

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
