"use client";

import MealItem from "@/app/components/Meals/MealItem/MealItem";
import Card from "@/app/components/UI/Card";
import { Meal } from "@/shared/types";
import { useEffect, useState } from "react";
import "./AvailableMeals.css";

const AvailableMeals = (): JSX.Element => {
	const [meals, setMeals] = useState<Meal[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [httpError, setHttpError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMeals = async () => {
			const response: Response = await fetch(
				"https://react-ts-food-order-default-rtdb.firebaseio.com/meals.json"
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const responseData: Meal[] = await response.json();
			const loadedMeals: Meal[] = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: +responseData[key].price,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((e) => {
			setIsLoading(false);
			setHttpError(e.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className="MealsLoading">
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className="MealsLoading">
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList: JSX.Element[] = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className="meals">
			<Card cssName="card">
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};
export default AvailableMeals;
