import { useContext } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CartProvider from "../src/app/store/CartProvider";
import CartContext from "../src/app/store/cart-context";

afterEach(cleanup);

function Harness() {
  const cart = useContext(CartContext);
  return <>
    <output data-testid="state">{JSON.stringify({items: cart.items, total: cart.totalAmount})}</output>
    <button onClick={() => cart.addItem({id: "meal", name: "Soup", amount: 1, price: 12.5})}>Add</button>
    <button onClick={() => cart.removeItem("meal")}>Remove</button>
    <button onClick={cart.clearCart}>Clear</button>
  </>;
}

const state = () => JSON.parse(screen.getByTestId("state").textContent!);
const click = (name: string) => fireEvent.click(screen.getByRole("button", {name}));

describe("cart behavior", () => {
  it("adds quantities, updates totals and removes the final item", () => {
    render(<CartProvider><Harness /></CartProvider>);
    click("Add"); click("Add");
    expect(state()).toEqual({items: [{id: "meal", name: "Soup", amount: 2, price: 12.5}], total: 25});
    click("Remove");
    expect(state().items[0].amount).toBe(1);
    expect(state().total).toBe(12.5);
    click("Remove");
    expect(state()).toEqual({items: [], total: 0});
  });
  it("clears the cart and allows another order", () => {
    render(<CartProvider><Harness /></CartProvider>);
    click("Add"); click("Clear");
    expect(state()).toEqual({items: [], total: 0});
    click("Add");
    expect(state().total).toBe(12.5);
  });
});
