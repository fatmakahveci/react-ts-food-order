import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import Home from "../src/app/page";

afterEach(cleanup);
HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };

describe("menu and ordering", () => {
  it("filters by category and search and recovers from no results", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", {name: "Pizza"}));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    fireEvent.change(screen.getByRole("textbox", {name: "Search the menu"}), {target: {value: "xyz"}});
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", {name: "Show all dishes"}));
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });
  it("updates cart totals and completes an explicitly demo order", () => {
    render(<Home />);
    const add = screen.getByRole("button", {name: "Margherita Pizza add to cart"});
    fireEvent.click(add); fireEvent.click(add);
    fireEvent.click(screen.getByRole("button", {name: /My cart/}));
    const modal = screen.getByRole("dialog");
    expect(within(modal).getAllByText(/TRY\s*570/)).toHaveLength(2);
    fireEvent.click(within(modal).getByRole("button", {name: "Margherita Pizza decrease"}));
    expect(within(modal).getAllByText(/TRY\s*285/)).toHaveLength(2);
    fireEvent.click(within(modal).getByRole("button", {name: /Continue to checkout/}));
    fireEvent.change(screen.getByLabelText("Full name"), {target: {value: "Test Customer"}});
    fireEvent.change(screen.getByLabelText("Phone number"), {target: {value: "05555555555"}});
    fireEvent.change(screen.getByLabelText("Delivery address"), {target: {value: "1 Example Street"}});
    fireEvent.submit(screen.getByRole("button", {name: /Complete demo order/}).closest("form")!);
    expect(screen.getByText("Your demo order is complete.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", {name: "Back to menu"}));
    fireEvent.click(screen.getByRole("button", {name: /My cart/}));
    expect(screen.getByText("Your next great bite awaits.")).toBeTruthy();
  });
});
