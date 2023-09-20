"use client";

import CartItem from "@/app/components/Cart/CartItem";
import Modal from "@/app/components/UI/Modal";
import CartContext from "@/app/store/cart-context";
import { CartItemProps, CartProps, FormInput, ItemValue } from "@/shared/types";
import { FC, useContext, useState } from "react";
import "./Cart.css";
import Checkout from "./Checkout";

const Cart: FC<CartProps> = ({ onClose }): JSX.Element => {
	const [isCheckout, setIsCheckout] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [didSubmit, setDidSubmit] = useState<boolean>(false);

	const cartCtx: ItemValue = useContext<ItemValue>(CartContext);

	const totalAmount: string = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems: boolean = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id: string): void => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item: CartItemProps): void => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const orderHandler = (): void => {
		setIsCheckout(true);
	};

	const cartItems: JSX.Element = (
		<ul className="cart-items">
			{cartCtx.items.map((item: CartItemProps) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const submitOrderHandler = async (formInput: FormInput) => {
		setIsSubmitting(true);
		await fetch(
			"https://react-ts-food-order-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: formInput,
					orderedItems: cartCtx.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const modalActions: JSX.Element = (
		<div className="actions">
			<button className="button-alt" onClick={onClose}>
				Close
			</button>
			{hasItems && (
				<button className="button" onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent: JSX.Element = (
		<>
			{cartItems}
			<div className="total">
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={onClose} />
			)}
			{!isCheckout && modalActions}
		</>
	);

	const isSubmittingModalContent: JSX.Element = <p>Sending order data...</p>;

	const didSubmitModalContent: JSX.Element = (
		<>
			<p>Successfully sent the order!</p>
			<div className="actions">
				<button className="button" onClick={onClose}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal onClose={onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};
export default Cart;
