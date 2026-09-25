"use client";

import CartIcon from "@/app/components/Cart/CartIcon";
import CartContext from "@/app/store/cart-context";
import { HeaderCartButtonProps, ItemValue } from "@/shared/types";
import { FC, useContext, useEffect, useRef } from "react";
import "./HeaderCartButton.css";

const HeaderCartButton: FC<HeaderCartButtonProps> = ({
	onClick,
}): JSX.Element => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const cartCtx: ItemValue = useContext<ItemValue>(CartContext);

	const { items }: ItemValue = cartCtx;

	const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		const animation = buttonRef.current?.animate(
			[{ transform: "scale(1)" }, { transform: "scale(1.1)" }, { transform: "scale(1)" }],
			{ duration: 300 }
		);
		return () => animation?.cancel();
	}, [items]);

	return (
		<button
			ref={buttonRef}
			className="button"
			onClick={onClick}
		>
			<span className="icon">
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className="badge">{numberOfCartItems}</span>
		</button>
	);
};
export default HeaderCartButton;
