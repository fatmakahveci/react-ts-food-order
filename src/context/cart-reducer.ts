import type { CartAction, CartItemProps, CartState } from "@/shared/types";
import { DEFAULT_CART_STATE } from "@/shared/constants";

function withItems(items: CartItemProps[]): CartState {
  // Derive totals from line items in minor currency units to avoid drift.
  const totalCents = items.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.amount,
    0,
  );
  return { items, totalAmount: totalCents / 100 };
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const item = action.item;
      if (
        !item.id ||
        !Number.isSafeInteger(item.amount) ||
        item.amount <= 0 ||
        !Number.isFinite(item.price) ||
        item.price < 0
      )
        return state;
      const existing = state.items.find((entry) => entry.id === item.id);
      const amount = (existing?.amount ?? 0) + item.amount;
      const price = existing?.price ?? item.price;
      if (
        !Number.isSafeInteger(amount) ||
        !Number.isSafeInteger(Math.round(price * 100) * amount)
      )
        return state;
      const items = existing
        ? state.items.map((entry) =>
            entry.id === item.id ? { ...entry, amount } : entry,
          )
        : [...state.items, { ...item }];
      const next = withItems(items);
      return Number.isSafeInteger(Math.round(next.totalAmount * 100))
        ? next
        : state;
    }
    case "REMOVE": {
      const existing = state.items.find((item) => item.id === action.id);
      if (!existing) return state;
      return withItems(
        existing.amount === 1
          ? state.items.filter((item) => item.id !== action.id)
          : state.items.map((item) =>
              item.id === action.id
                ? { ...item, amount: item.amount - 1 }
                : item,
            ),
      );
    }
    case "CLEAR":
      return DEFAULT_CART_STATE;
    default:
      return state;
  }
}
