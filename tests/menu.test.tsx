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
    fireEvent.change(screen.getByRole("textbox", {name: "Menüde ara"}), {target: {value: "xyz"}});
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", {name: "Tüm menüyü göster"}));
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });
  it("updates cart totals and completes an explicitly demo order", () => {
    render(<Home />);
    const add = screen.getByRole("button", {name: "Margherita Pizza sepete ekle"});
    fireEvent.click(add); fireEvent.click(add);
    fireEvent.click(screen.getByRole("button", {name: /Sepetim/}));
    const modal = screen.getByRole("dialog");
    expect(within(modal).getAllByText("₺570")).toHaveLength(2);
    fireEvent.click(within(modal).getByRole("button", {name: "Margherita Pizza azalt"}));
    expect(within(modal).getAllByText("₺285")).toHaveLength(2);
    fireEvent.click(within(modal).getByRole("button", {name: /Siparişe devam/}));
    fireEvent.change(screen.getByLabelText("Ad soyad"), {target: {value: "Test Kullanıcı"}});
    fireEvent.change(screen.getByLabelText("Telefon"), {target: {value: "05555555555"}});
    fireEvent.change(screen.getByLabelText("Teslimat adresi"), {target: {value: "Örnek Mahallesi No: 1"}});
    fireEvent.submit(screen.getByRole("button", {name: /Demo siparişi tamamla/}).closest("form")!);
    expect(screen.getByText("Demo siparişin tamamlandı.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", {name: "Menüye dön"}));
    fireEvent.click(screen.getByRole("button", {name: /Sepetim/}));
    expect(screen.getByText("Güzel bir lokmaya yer var.")).toBeTruthy();
  });
});
