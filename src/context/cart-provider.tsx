"use client";

import { useMemo, useReducer } from "react";
import type { CartProviderProps, ItemValue } from "@/shared/types";
import { DEFAULT_CART_STATE } from "@/shared/constants";
import CartContext from "./cart-context";
import { cartReducer } from "./cart-reducer";

export default function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, DEFAULT_CART_STATE);
  const value = useMemo<ItemValue>(
    () => ({
      ...state,
      addItem: (item) => dispatch({ type: "ADD", item }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    }),
    [state],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
