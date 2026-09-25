"use client";

import {
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import CartProvider from "../context/cart-provider";
import CartContext from "../context/cart-context";
import { meals, type Meal } from "@/data/menu";
import { money, photo, photoSrcSet } from "@/lib/format";
import Icon from "@/components/icon";
import MenuSection from "@/components/menu-section";
import CartDialog from "@/components/cart-dialog";

function Experience() {
  const cart = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = cart.items.reduce((sum, item) => sum + item.amount, 0);
  const cartTrigger = useRef<HTMLButtonElement | null>(null);
  const headerCart = useRef<HTMLButtonElement>(null);
  const openCart = (event: MouseEvent<HTMLButtonElement>) => {
    cartTrigger.current = event.currentTarget;
    setCartOpen(true);
  };
  useEffect(() => {
    // The floating trigger can disappear after checkout clears the cart.
    if (!cartOpen && cartTrigger.current) {
      const target = cartTrigger.current.isConnected
        ? cartTrigger.current
        : headerCart.current;
      target?.focus({ preventScroll: true });
    }
  }, [cartOpen]);
  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );
  const add = (meal: Meal) => {
    cart.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      amount: 1,
    });
    setNotice(`${meal.name} added to your cart`);
    // Restart the timer even for repeated additions of the same dish.
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2200);
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement">
        Good food makes a great day. <span>Happiness in every bite.</span>
      </div>
      <header className="header container">
        <a className="brand" href="#" aria-label="Lokma home">
          <span className="brand-mark">l.</span>lokma
          <span className="brand-dot">.</span>
        </a>
        <nav
          id="main-navigation"
          className={mobileMenuOpen ? "is-open" : ""}
          aria-label="Main navigation"
          onClick={() => setMobileMenuOpen(false)}
        >
          <a href="#menu" className="active">
            Menu
          </a>
          <a href="#about">Why Lokma?</a>
          <a href="#help">FAQs</a>
        </nav>
        <button
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "×" : "☰"}
        </button>
        <button
          ref={headerCart}
          className="cart-button"
          onClick={openCart}
          aria-label={`My cart, ${count} ${count === 1 ? "item" : "items"}`}
        >
          <Icon name="bag" />
          <span>My cart</span>
          <b>{count}</b>
        </button>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> FRESHLY MADE. HAPPILY ENJOYED.
            </div>
            <h1>
              Whatever you crave,
              <br />
              <em>one bite</em> away.
            </h1>
            <p>
              Thoughtfully chosen ingredients. Flavours you love.
              <br />
              Let us make your next break the best part of your day.
            </p>
            <a className="primary" href="#menu">
              Explore the menu <Icon name="arrow" />
            </a>
            <div className="hero-notes">
              <span>
                <Icon name="clock" size={17} /> Warm & fresh
              </span>
              <span>
                <span className="tiny-star">✦</span> Made with care
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-image"
              src={photo("classic-cheeseburger", 1200)}
              srcSet={photoSrcSet("classic-cheeseburger")}
              sizes="(max-width: 760px) calc(100vw - 52px), (max-width: 1336px) 48vw, 600px"
              width={1200}
              height={900}
              alt="Burger with fresh vegetables and melted cheddar"
              fetchPriority="high"
            />
            <div className="image-label">
              GOOD INGREDIENTS.
              <br />
              REAL FLAVOUR.
            </div>
            <div className="floating-card">
              <span className="floating-icon">✦</span>
              <div>
                <strong>Today’s favourite</strong>
                <span>Classic Cheeseburger</span>
              </div>
              <button
                aria-label="Classic Cheeseburger add to cart"
                onClick={() => add(meals[0])}
              >
                ↗
              </button>
            </div>
            <div className="round-stamp">
              HAPPINESS
              <br />
              <b>one bite</b>
              <br />
              AT A TIME
            </div>
          </div>
        </section>
        <div className="perks container">
          <span>
            <b>01</b> Real ingredients
          </span>
          <span>
            <b>02</b> Freshly made to order
          </span>
          <span>
            <b>03</b> Something for everyone
          </span>
          <span>
            <b>04</b> Joy in every bite
          </span>
        </div>
        <MenuSection onAdd={add} />
        <section className="story container" id="about">
          <div className="story-symbol">✳</div>
          <div>
            <div className="eyebrow">OUR RECIPE IS SIMPLE</div>
            <h2>Good food. Good mood.</h2>
            <p>
              Seasonal freshness, a little kitchen care and the joy of sharing
              <br className="desktop" /> come together at our table. Because
              every meal deserves to be a good one.
            </p>
          </div>
          <a href="#menu" className="text-link">
            Find your favourite <Icon name="arrow" />
          </a>
        </section>
        <section id="help" className="faq container">
          <div>
            <div className="eyebrow">GOOD TO KNOW</div>
            <h2>
              Little questions,
              <br />
              simple answers.
            </h2>
          </div>
          <div className="faq-items">
            <details>
              <summary>How do I place an order?</summary>
              <p>
                Add your favourites to the cart, adjust quantities and fill in
                the delivery form. This is a demo website: no payment is taken
                and no delivery is arranged.
              </p>
            </details>
            <details>
              <summary>Are there vegetarian options?</summary>
              <p>
                Explore our Pizza and Healthy categories. For allergen
                information or special dietary requirements, contact the
                restaurant before placing a real order.
              </p>
            </details>
            <details>
              <summary>How long does delivery take?</summary>
              <p>
                The times on our menu are sample preparation and delivery
                estimates. This demo does not offer a real delivery service.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer className="container">
        <a href="#" className="brand">
          lokma<span className="brand-dot">.</span>
        </a>
        <span>
          Good flavours. Great moments.
          <br />
          <span className="footer-note">Made for the love of good food.</span>
        </span>
        <small>
          © {new Date().getFullYear()} Lokma · Demo restaurant experience
        </small>
      </footer>
      <div className={`toast ${notice ? "visible" : ""}`} role="status">
        ✓ {notice}
      </div>
      {count > 0 && !cartOpen && (
        <button
          className="floating-cart"
          onClick={openCart}
          aria-label="View order summary"
        >
          <span className="floating-cart-count">{count}</span>
          <span>
            View your order
            <small>
              {count === 1
                ? "One delicious choice"
                : "Something good is waiting"}
            </small>
          </span>
          <strong>{money(cart.totalAmount)}</strong>
          <Icon name="arrow" />
        </button>
      )}
      {cartOpen && <CartDialog onClose={() => setCartOpen(false)} />}
    </>
  );
}
export default function Home() {
  return (
    <CartProvider>
      <Experience />
    </CartProvider>
  );
}
