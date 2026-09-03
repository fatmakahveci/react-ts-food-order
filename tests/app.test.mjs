import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the page provides cart state to the ordering experience", async () => {
  const page = await readFile("src/app/page.tsx", "utf8");

  assert.match(page, /<CartProvider>/);
  assert.match(page, /<Header onShowCart=\{showCartHandler\}/);
  assert.match(page, /cartIsShown && <Cart/);
  assert.match(page, /<Meals \/>/);
});

test("the cart reducer supports adding and removing items", async () => {
  const provider = await readFile("src/app/store/CartProvider.tsx", "utf8");

  assert.match(provider, /action\.type === "ADD"/);
  assert.match(provider, /action\.type === "REMOVE"/);
  assert.match(provider, /totalAmount/);
});
