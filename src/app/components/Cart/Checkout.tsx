"use client";

import { FC, FormEvent } from "react";
import { CheckoutProps } from "@/shared/types";

const Checkout: FC<CheckoutProps> = ({ onCancel }) => {
	const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
	};

	return (
		<form className="form" onSubmit={submitHandler}>
			<div className="control">
				<label htmlFor="name">Name</label>
				<input type="text" id="name" />
			</div>
			<div className="control">
				<label htmlFor="street">Street</label>
				<input type="text" id="street" />
			</div>
			<div className="control">
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" />
			</div>
			<div className="control">
				<label htmlFor="city">City</label>
				<input type="text" id="city" />
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
