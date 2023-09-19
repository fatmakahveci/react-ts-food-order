"use client";

import Input from "@/app/components/UI/Input";
import { MealItemFormProps } from "@/shared/types";
import { FC, FormEvent, useRef, useState } from "react";
import "./MealItemForm.css";

const MealItemForm: FC<MealItemFormProps> = ({
	id,
	onAddToCart,
}): JSX.Element => {
	const [amountIsValid, setAmountIsValid] = useState<boolean>(true);
	const amountInputRef = useRef<HTMLInputElement | null>(null);

	const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (!amountInputRef.current) throw new Error("Amount is required");
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setAmountIsValid(false);
			return;
		}

		onAddToCart(enteredAmountNumber);
	};

	return (
		<form className="form" onSubmit={submitHandler}>
			<Input
				label="Amount"
				input={{
					id: "amount" + `${id}`,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
				ref={amountInputRef}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};
export default MealItemForm;
