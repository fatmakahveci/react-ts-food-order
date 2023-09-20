"use client";

import { CheckoutProps, FormInputValidity } from "@/shared/types";
import { FC, FormEvent, useRef, useState } from "react";
import "./Checkout.css";

const isEmpty: (value: any) => boolean = (value) => value.trim() === "";
const isFiveChars: (value: any) => boolean = (value) =>
	value.trim().length === 5;

const Checkout: FC<CheckoutProps> = ({ onCancel, onConfirm }) => {
	const [formInputsValidity, setFormInputsValidity] =
		useState<FormInputValidity>({
			name: true,
			street: true,
			city: true,
			postalCode: true,
		});

	const nameInputRef = useRef<HTMLInputElement>(null);
	const streetInputRef = useRef<HTMLInputElement>(null);
	const postalCodeInputRef = useRef<HTMLInputElement>(null);
	const cityInputRef = useRef<HTMLInputElement>(null);

	const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		const nameInput: string | undefined = nameInputRef.current?.value;
		const streetInput: string | undefined = streetInputRef.current?.value;
		const postalCodeInput: string | undefined =
			postalCodeInputRef.current?.value;
		const cityInput: string | undefined = cityInputRef.current?.value;

		const nameInputValid: boolean = !isEmpty(nameInput);
		const streetInputValid: boolean = !isEmpty(streetInput);
		const postalCodeInputValid: boolean = !isEmpty(postalCodeInput);
		const cityInputValid: boolean = isFiveChars(cityInput);

		setFormInputsValidity({
			name: nameInputValid,
			street: streetInputValid,
			postalCode: postalCodeInputValid,
			city: cityInputValid,
		});

		const formIsValid: boolean =
			nameInputValid &&
			streetInputValid &&
			postalCodeInputValid &&
			cityInputValid;

		if (!formIsValid) {
			return;
		}

		onConfirm({
			name: nameInput,
			street: streetInput,
			postalCode: postalCodeInput,
			city: cityInput,
		});
	};

	return (
		<form className="form" onSubmit={submitHandler}>
			<div
				className={`control ${
					formInputsValidity.name ? "" : "invalid"
				}`}
			>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputsValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div
				className={`control ${
					formInputsValidity.street ? "" : "invalid"
				}`}
			>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formInputsValidity.street && (
					<p>Please enter a valid street!</p>
				)}
			</div>
			<div
				className={`control ${
					formInputsValidity.postalCode ? "" : "invalid"
				}`}
			>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
				{!formInputsValidity.postalCode && (
					<p>Please enter a valid postal code!</p>
				)}
			</div>
			<div
				className={`control ${
					formInputsValidity.city ? "" : "invalid"
				}`}
			>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputsValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className="actions">
				<button type="button" onClick={onCancel}>
					Cancel
				</button>
				<button className="submit">Confirm</button>
			</div>
		</form>
	);
};
export default Checkout;
