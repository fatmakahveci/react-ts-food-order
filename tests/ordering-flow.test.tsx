import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import Home from "../src/app/page";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
};

describe("menu and ordering", () => {
  it("filters by category and search and recovers from no results", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "Pizza" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    fireEvent.change(screen.getByRole("textbox", { name: "Search the menu" }), {
      target: { value: "xyz" },
    });
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Show all dishes" }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });
  it("updates cart totals and completes an explicitly demo order", () => {
    render(<Home />);
    const add = screen.getByRole("button", {
      name: "Margherita Pizza add to cart",
    });
    fireEvent.click(add);
    fireEvent.click(add);
    fireEvent.click(screen.getByRole("button", { name: /My cart/ }));
    const modal = screen.getByRole("dialog");
    expect(within(modal).getAllByText(/TRY\s*570/)).toHaveLength(2);
    fireEvent.click(
      within(modal).getByRole("button", { name: "Margherita Pizza decrease" }),
    );
    expect(within(modal).getAllByText(/TRY\s*285/)).toHaveLength(2);
    fireEvent.click(
      within(modal).getByRole("button", { name: /Continue to checkout/ }),
    );
    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "Test Customer" },
    });
    fireEvent.change(screen.getByLabelText("Phone number"), {
      target: { value: "05555555555" },
    });
    fireEvent.change(screen.getByLabelText("Delivery address"), {
      target: { value: "1 Example Street" },
    });
    fireEvent.submit(
      screen
        .getByRole("button", { name: /Complete demo order/ })
        .closest("form")!,
    );
    expect(screen.getByText("Your demo order is complete.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Back to menu" }));
    fireEvent.click(screen.getByRole("button", { name: /My cart/ }));
    expect(screen.getByText("Your next great bite awaits.")).toBeTruthy();
  });
});

describe("menu and dialog edge cases", () => {
  it("trims whitespace and ignores case in searches", () => {
    render(<Home />);
    fireEvent.change(screen.getByRole("textbox", { name: "Search the menu" }), {
      target: { value: "  PIZZA  " },
    });
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Margherita Pizza" }),
    ).toBeTruthy();
  });

  it("names the dialog and returns to the cart after closing checkout", () => {
    render(<Home />);
    fireEvent.click(
      screen.getByRole("button", { name: "Margherita Pizza add to cart" }),
    );
    fireEvent.click(screen.getByRole("button", { name: /My cart/ }));
    expect(screen.getByRole("dialog", { name: "My cart" })).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Continue to checkout" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Close cart" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /My cart/ }));
    expect(screen.getByRole("dialog", { name: "My cart" })).toBeTruthy();
  });
});

describe("interaction regressions", () => {
  it("restarts the notification timer for repeated additions", () => {
    vi.useFakeTimers();
    render(<Home />);
    const add = screen.getByRole("button", {
      name: "Margherita Pizza add to cart",
    });
    fireEvent.click(add);
    act(() => vi.advanceTimersByTime(2000));
    fireEvent.click(add);
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole("status").textContent).toContain(
      "Margherita Pizza added",
    );
    act(() => vi.advanceTimersByTime(1900));
    expect(screen.getByRole("status").textContent).not.toContain(
      "Margherita Pizza added",
    );
  });

  it("keeps the dialog open for padding clicks and closes on backdrop clicks", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /My cart/ }));
    const dialog = screen.getByRole("dialog");
    vi.spyOn(dialog, "getBoundingClientRect").mockReturnValue({
      left: 10,
      top: 10,
      right: 100,
      bottom: 100,
      width: 90,
      height: 90,
      x: 10,
      y: 10,
      toJSON: () => ({}),
    });
    fireEvent.click(dialog, { clientX: 20, clientY: 20 });
    expect(screen.getByRole("dialog")).toBeTruthy();
    fireEvent.click(dialog, { clientX: 200, clientY: 200 });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("browsing improvements", () => {
  it("sorts meals by price without losing the current category", () => {
    render(<Home />);
    fireEvent.change(screen.getByRole("combobox", { name: "Sort by" }), {
      target: { value: "price-low" },
    });
    expect(
      within(screen.getAllByRole("article")[0]).getByRole("heading")
        .textContent,
    ).toBe("Chocolate Brownie");
    fireEvent.click(screen.getByRole("button", { name: "Healthy" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      within(screen.getAllByRole("article")[0]).getByRole("heading")
        .textContent,
    ).toBe("Garden Salad");
  });

  it("offers an order shortcut and reflects quantities on meal cards", () => {
    render(<Home />);
    expect(
      screen.queryByRole("button", { name: "View order summary" }),
    ).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: "Margherita Pizza add to cart" }),
    );
    expect(screen.getByText("✓ 1 in cart")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "View order summary" }));
    expect(screen.getByRole("dialog", { name: "My cart" })).toBeTruthy();
  });

  it("toggles mobile navigation and closes it when a link is selected", () => {
    render(<Home />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(screen.getByRole("link", { name: "Why Lokma?" }));
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("shows actionable checkout errors and focuses the first invalid field", () => {
    render(<Home />);
    fireEvent.click(
      screen.getByRole("button", { name: "Margherita Pizza add to cart" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "View order summary" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Continue to checkout" }),
    );
    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "  " },
    });
    fireEvent.change(screen.getByLabelText("Phone number"), {
      target: { value: "----------" },
    });
    fireEvent.submit(
      screen
        .getByRole("button", { name: "Complete demo order" })
        .closest("form")!,
    );
    expect(screen.getAllByRole("alert")).toHaveLength(3);
    expect(document.activeElement).toBe(screen.getByLabelText("Full name"));
    expect(
      screen.getByRole("dialog", { name: "Delivery details" }),
    ).toBeTruthy();
    expect(screen.queryByText("Your demo order is complete.")).toBeNull();
  });
});
