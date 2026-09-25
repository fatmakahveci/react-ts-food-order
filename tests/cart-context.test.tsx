import { useContext } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CartProvider from "../src/context/cart-provider";
import CartContext from "../src/context/cart-context";

afterEach(cleanup);

function Harness() {
  const cart = useContext(CartContext);
  return (
    <>
      <output data-testid="state">
        {JSON.stringify({ items: cart.items, total: cart.totalAmount })}
      </output>
      <button
        onClick={() =>
          cart.addItem({ id: "meal", name: "Soup", amount: 1, price: 12.5 })
        }
      >
        Add
      </button>
      <button onClick={() => cart.removeItem("meal")}>Remove</button>
      <button onClick={cart.clearCart}>Clear</button>
    </>
  );
}

const state = () => JSON.parse(screen.getByTestId("state").textContent!);
const click = (name: string) =>
  fireEvent.click(screen.getByRole("button", { name }));

describe("cart behavior", () => {
  it("adds quantities, updates totals and removes the final item", () => {
    render(
      <CartProvider>
        <Harness />
      </CartProvider>,
    );
    click("Add");
    click("Add");
    expect(state()).toEqual({
      items: [{ id: "meal", name: "Soup", amount: 2, price: 12.5 }],
      total: 25,
    });
    click("Remove");
    expect(state().items[0].amount).toBe(1);
    expect(state().total).toBe(12.5);
    click("Remove");
    expect(state()).toEqual({ items: [], total: 0 });
  });
  it("clears the cart and allows another order", () => {
    render(
      <CartProvider>
        <Harness />
      </CartProvider>,
    );
    click("Add");
    click("Clear");
    expect(state()).toEqual({ items: [], total: 0 });
    click("Add");
    expect(state().total).toBe(12.5);
  });
});

// The reducer also needs to stay safe when called outside the menu UI.
import { cartReducer } from "../src/context/cart-reducer";
import { DEFAULT_CART_STATE } from "../src/shared/constants";

describe("cart edge cases", () => {
  const item = { id: "test", name: "Test meal", price: 0.1, amount: 1 };

  it("ignores removal of an item that does not exist", () => {
    expect(
      cartReducer(DEFAULT_CART_STATE, { type: "REMOVE", id: "missing" }),
    ).toBe(DEFAULT_CART_STATE);
  });

  it("keeps decimal totals accurate and reaches zero after removal", () => {
    const added = cartReducer(DEFAULT_CART_STATE, {
      type: "ADD",
      item: { ...item, amount: 3 },
    });
    expect(added.totalAmount).toBe(0.3);
    const removed = cartReducer(added, { type: "REMOVE", id: item.id });
    expect(removed.totalAmount).toBe(0.2);
  });

  it("keeps the stored price consistent when the same ID is added again", () => {
    const first = cartReducer(DEFAULT_CART_STATE, { type: "ADD", item });
    const second = cartReducer(first, {
      type: "ADD",
      item: { ...item, price: 999 },
    });
    expect(second.items[0]).toEqual({ ...item, amount: 2 });
    expect(second.totalAmount).toBe(0.2);
  });

  it.each([
    { amount: 0 },
    { amount: -1 },
    { amount: 1.5 },
    { amount: Infinity },
    { price: -1 },
    { price: NaN },
    { price: Infinity },
    { id: "" },
  ])("ignores invalid items: %j", (invalid) => {
    expect(
      cartReducer(DEFAULT_CART_STATE, {
        type: "ADD",
        item: { ...item, ...invalid },
      }),
    ).toBe(DEFAULT_CART_STATE);
  });
});
