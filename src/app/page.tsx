"use client";

import Cart from "@/app/components/Cart/Cart";
import Header from "@/app/components/Layout/Header";
import Meals from "@/app/components/Meals/Meals";
import CartProvider from "@/app/store/CartProvider";
import { useState } from "react";
import "./globals.css";

const Home = (): JSX.Element => {
	const [cartIsShown, setCartIsShown] = useState<boolean>(false);

	const showCartHandler = (): void => {
		setCartIsShown(true);
	};

	const hideCartHandler = (): void => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
};

export default Home;
