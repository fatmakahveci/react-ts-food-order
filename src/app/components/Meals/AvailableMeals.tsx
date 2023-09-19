"use client";

import MealItem from "@/app/components/Meals/MealItem/MealItem";
import Card from "@/app/components/UI/Card";
import { Meal } from "@/shared/types";
import { useEffect, useState } from "react";
import "./AvailableMeals.css";

const AvailableMeals = (): JSX.Element => {
	const [meals, setMeals] = useState<Meal[]>([]);

	useEffect(() => {
		const fetchMeals = async () => {
			const response: Response = await fetch(
				"https://react-ts-food-order-default-rtdb.firebaseio.com/meals.json"
			);
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
		};
		fetchMeals();
	}, []);

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
