"use client";

import { HTMLInputTypeAttribute, ReactNode, Ref } from "react";

export type BackdropProps = {
	onClose: () => void;
};

export type ButtonProps = {
	children: ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	type: "submit" | "reset" | "button" | undefined;
};

export type CardProps = {
	children: ReactNode;
	cssName: string;
};

export type CartAction =
	| { type: "ADD"; item: CartItemProps }
	| { type: "CLEAR" }
	| { type: "REMOVE"; id: string };

export type CartItemProps = {
	amount: number;
	id?: any;
	key?: string;
	name: string;
	onAdd?: () => void;
	onRemove?: () => void;
	price: number;
};

export type CartProps = {
	onClose: () => void;
};

export type CartProviderProps = {
	children: ReactNode;
};

export type CartState = {
	items: CartItemProps[];
	totalAmount: number;
};

export type CheckoutProps = {
	onCancel: () => void;
	onConfirm: (formInput: FormInput) => void;
};

export type FormInput = {
	city: string | undefined;
	name: string | undefined;
	postalCode: string | undefined;
	street: string | undefined;
};

export type FormInputValidity = {
	city: boolean;
	name: boolean;
	postalCode: boolean;
	street: boolean;
};

export type HeaderCartButtonProps = {
	onClick: () => void;
};

export type HeaderProps = {
	onShowCart: () => void;
};

export type InputProps = {
	input: {
		defaultValue: string;
		id: string;
		max: string;
		min: string;
		step: string;
		type: HTMLInputTypeAttribute;
	};
	label: string;
	ref?: Ref<HTMLInputElement> | null;
};

export type ItemValue = {
	addItem: (item: CartItemProps) => void;
	clearCart: () => void;
	items: CartItemProps[];
	removeItem: (id: string) => void;
	totalAmount: number;
};

export type Meal = {
	description: string;
	id?: string;
	name: string;
	price: number;
};

export type MealItemFormProps = {
	id: string | undefined;
	onAddToCart: (amount: number) => void;
};

export type ModalOverlayProps = {
	children: ReactNode;
};

export type ModalProps = {
	children: ReactNode;
	onClose: () => void;
};
