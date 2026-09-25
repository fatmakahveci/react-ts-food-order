"use client";
import { useContext, useState } from "react";
import { categories, meals, type Meal } from "@/data/menu";
import { money, photo } from "@/lib/format";
import Icon from "./icon";
import CartContext from "@/context/cart-context";

export default function MenuSection({
  onAdd,
}: {
  onAdd: (meal: Meal) => void;
}) {
  const cart = useContext(CartContext);
  const [sort, setSort] = useState("featured");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const query = search.trim().toLocaleLowerCase("en");
  const shown = meals.filter(
    (meal) =>
      (category === "All" || meal.category === category) &&
      `${meal.name} ${meal.description}`
        .toLocaleLowerCase("en")
        .includes(query),
  );
  const sorted = [...shown].sort((a, b) =>
    sort === "price-low"
      ? a.price - b.price
      : sort === "price-high"
        ? b.price - a.price
        : 0,
  );
  return (
    <section className="menu-section container" id="menu">
      <div className="section-top">
        <div>
          <div className="eyebrow">FIND YOUR NEXT FAVOURITE</div>
          <h2>What sounds good today?</h2>
          <p className="section-description">
            Freshly made favourites, ready for your next good moment.
          </p>
        </div>
        <label className="search">
          <Icon name="search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What are you craving?"
            aria-label="Search the menu"
          />
          {search && (
            <button aria-label="Clear search" onClick={() => setSearch("")}>
              ×
            </button>
          )}
        </label>
      </div>
      <div className="category-bar">
        {categories.map((item, i) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            <span className="category-icon" aria-hidden="true">
              {["✦", "◒", "◔", "❋", "≋", "♡"][i]}
            </span>
            {item}
            <span className="category-count" aria-hidden="true">
              {item === "All"
                ? meals.length
                : meals.filter((meal) => meal.category === item).length}
            </span>
          </button>
        ))}
      </div>
      <div className="menu-toolbar">
        <p aria-live="polite">
          {shown.length} {shown.length === 1 ? "dish" : "dishes"} to discover
          {category !== "All" ? ` · ${category}` : ""}
        </p>
        <label className="sort-control">
          Sort by
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Our favourites</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>
      <div className="meal-grid">
        {sorted.map((meal) => (
          <article className="meal-card" key={meal.id}>
            <div className="meal-photo">
              <img
                src={photo(meal.image)}
                alt={meal.name}
                loading="lazy"
                decoding="async"
              />
              <span
                className={`tag ${meal.category === "Healthy" || meal.category === "Pizza" ? "green" : ""}`}
              >
                {meal.tag}
              </span>
              {cart.items.some((item) => item.id === meal.id) && (
                <span className="in-cart-badge">
                  ✓ {cart.items.find((item) => item.id === meal.id)?.amount} in
                  cart
                </span>
              )}
            </div>
            <div className="meal-info">
              <div className="meal-meta">
                <span>{meal.category}</span>
                <span>
                  <Icon name="clock" size={13} />
                  {meal.time}
                </span>
              </div>
              <h3>{meal.name}</h3>
              <p>{meal.description}</p>
              <div className="meal-bottom">
                <strong>{money(meal.price)}</strong>
                <button
                  onClick={() => onAdd(meal)}
                  aria-label={`${meal.name} add to cart`}
                >
                  <span>Add to cart</span> +
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <div className="empty-state">
          <h3>No dishes found.</h3>
          <p>Try another search or explore the full menu.</p>
          <button
            className="primary"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Show all dishes
          </button>
        </div>
      )}
    </section>
  );
}
