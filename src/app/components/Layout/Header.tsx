"use client";

import mealsImage from "@/app/assets/meals.jpg";
import { HeaderProps } from "@/shared/types";
import Image from "next/image";
import { FC } from "react";
import "./Header.css";
import HeaderCartButton from "./HeaderCartButton";

const Header: FC<HeaderProps> = ({ onShowCart }): JSX.Element => {
	return (
		<>
			<header className="header">
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={onShowCart} />
			</header>
			<div className="main-image">
				<Image src={mealsImage} alt="A table full of delicious food!" />
			</div>
		</>
	);
};
export default Header;
