"use client";

import { ItemValue } from "@/shared/types";
import { Context, createContext } from "react";

const CartContext: Context<ItemValue> = createContext<ItemValue>({
	addItem: () => {},
	clearCart: () => {},
	items: [],
	removeItem: () => {},
	totalAmount: 0,
});

export default CartContext;
