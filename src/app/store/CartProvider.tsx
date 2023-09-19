"use client";

import { FC, useReducer } from "react";
import {
	CartAction,
	CartItemProps,
	CartProviderProps,
	CartState,
	ItemValue,
} from "@/shared/types";
import CartContext from "./cart-context";
import { DEFAULT_CART_STATE } from "@/shared/constants";

const cartReducer = (state: CartState, action: CartAction) => {
	if (action.type === "ADD") {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		const existingCartItemIndex = state.items.findIndex(
			(item: CartItemProps) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "REMOVE") {
		const existingCartItemIndex = state.items.findIndex(
			(item: CartItemProps) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;

		if (existingItem.amount === 1) {
			updatedItems = state.items.filter(
				(item: CartItemProps) => item.id !== action.id
			);
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	return DEFAULT_CART_STATE;
};

const CartProvider: FC<CartProviderProps> = ({ children }): JSX.Element => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		DEFAULT_CART_STATE
	);

	const addItemToCartHandler = (item: CartItemProps): void => {
		dispatchCartAction({ type: "ADD", item: item });
	};

	const removeItemFromCartHandler = (id: string): void => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const cartContext: ItemValue = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{children}
		</CartContext.Provider>
	);
};
export default CartProvider;
