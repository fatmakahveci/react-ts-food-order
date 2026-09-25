import type { ReactNode } from "react";

export type CartItemProps = {
  id: string;
  name: string;
  price: number;
  amount: number;
};

export type CartAction =
  | { type: "ADD"; item: CartItemProps }
  | { type: "CLEAR" }
  | { type: "REMOVE"; id: string };

export type CartProviderProps = {
  children: ReactNode;
};

export type CartState = {
  items: CartItemProps[];
  totalAmount: number;
};

export type ItemValue = CartState & {
  addItem: (item: CartItemProps) => void;
  clearCart: () => void;
  removeItem: (id: string) => void;
};
