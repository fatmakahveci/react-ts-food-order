export type Meal = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  tag: string;
  time: string;
};

export const meals: readonly Meal[] = [
  {
    id: "burger",
    name: "Classic Cheeseburger",
    category: "Burger",
    price: 245,
    description:
      "Beef patty, cheddar, caramelized onions and our signature sauce.",
    image: "classic-cheeseburger",
    tag: "Bestseller",
    time: "20–30 min",
  },
  {
    id: "pizza",
    name: "Margherita Pizza",
    category: "Pizza",
    price: 285,
    description: "Thin crust, mozzarella, tomato sauce and fresh basil.",
    image: "margherita-pizza",
    tag: "Vegetarian",
    time: "25–35 min",
  },
  {
    id: "bowl",
    name: "Mediterranean Bowl",
    category: "Healthy",
    price: 220,
    description: "Seasonal greens, avocado and a colourful mix of vegetables.",
    image: "mediterranean-bowl",
    tag: "Light & fresh",
    time: "15–25 min",
  },
  {
    id: "pasta",
    name: "Italian Pasta",
    category: "Pasta",
    price: 260,
    description: "Tomato sauce, fresh herbs and a finishing touch of parmesan.",
    image: "italian-pasta",
    tag: "Chef’s choice",
    time: "20–30 min",
  },
  {
    id: "sweet",
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 135,
    description:
      "Rich dark chocolate, a fudgy centre and a little moment of joy.",
    image: "chocolate-brownie",
    tag: "A sweet break",
    time: "15–20 min",
  },
  {
    id: "salad",
    name: "Garden Salad",
    category: "Healthy",
    price: 195,
    description: "Fresh vegetables, crisp greens and a bright lemon dressing.",
    image: "garden-salad",
    tag: "In season",
    time: "15–25 min",
  },
];
export const categories = [
  "All",
  "Burger",
  "Pizza",
  "Healthy",
  "Pasta",
  "Desserts",
];
