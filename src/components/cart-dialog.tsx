"use client";
import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "@/context/cart-context";
import { meals } from "@/data/menu";
import { money, photo } from "@/lib/format";
import Icon from "./icon";

const mealsById = new Map(meals.map((meal) => [meal.id, meal]));

export default function CartDialog({ onClose }: { onClose: () => void }) {
  const cart = useContext(CartContext);
  const [stage, setStage] = useState<"cart" | "checkout" | "done">("cart");
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "phone" | "address", string>>
  >({});
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
  }, []);
  useEffect(() => {
    // Announce each new step and keep keyboard focus inside the modal.
    const target =
      stage === "checkout"
        ? dialog.current?.querySelector<HTMLInputElement>('input[name="name"]')
        : dialog.current?.querySelector<HTMLHeadingElement>("#cart-title");
    target?.focus();
  }, [stage]);
  return (
    <dialog
      ref={dialog}
      className="cart-dialog"
      aria-labelledby="cart-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        // Backdrop clicks target the dialog too; bounds distinguish them from its padding.
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.target === event.currentTarget &&
          (event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom)
        )
          onClose();
      }}
    >
      <div className="dialog-header">
        <h2 id="cart-title" tabIndex={-1}>
          {stage === "done"
            ? "Thank you!"
            : stage === "checkout"
              ? "Delivery details"
              : "My cart"}
        </h2>
        <button
          className="close"
          onClick={() => onClose()}
          aria-label="Close cart"
        >
          ×
        </button>
      </div>
      <ol className="checkout-steps" aria-label="Order progress">
        {["Your cart", "Your details", "All done"].map((label, index) => (
          <li
            key={label}
            aria-current={
              index === ["cart", "checkout", "done"].indexOf(stage)
                ? "step"
                : undefined
            }
          >
            <span>{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      {stage === "done" ? (
        <div className="empty-state">
          <span className="success-icon">✓</span>
          <h3>Your demo order is complete.</h3>
          <p>
            This is a demo experience. No payment was taken and no real order
            was placed.
          </p>
          <button className="primary" onClick={() => onClose()}>
            Back to menu
          </button>
        </div>
      ) : stage === "checkout" ? (
        <form
          className="checkout"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const name = String(data.get("name") ?? "").trim();
            const phone = String(data.get("phone") ?? "").trim();
            const address = String(data.get("address") ?? "").trim();
            const nextErrors: typeof errors = {};
            if (name.length < 2)
              nextErrors.name = "Enter your full name (at least 2 characters).";
            if (
              !/^[+0-9 ()-]+$/.test(phone) ||
              phone.replace(/\D/g, "").length < 10 ||
              phone.replace(/\D/g, "").length > 15
            )
              nextErrors.phone = "Enter a phone number with 10–15 digits.";
            if (address.length < 10)
              nextErrors.address =
                "Enter an address with at least 10 characters.";
            setErrors(nextErrors);
            // Follow field order so keyboard users can correct the first invalid input.
            const firstError = Object.keys(nextErrors)[0];
            if (firstError) {
              (
                e.currentTarget.elements.namedItem(firstError) as HTMLElement
              )?.focus();
              return;
            }
            // Demo completion stays local: delivery details are never sent or persisted.
            cart.clearCart();
            setStage("done");
          }}
        >
          <p className="demo-note">
            Demo order · Your details are not sent or stored.
          </p>
          <label>
            Full name
            <input
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              placeholder="e.g. Alex Taylor"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </label>
          {errors.name && (
            <span id="name-error" className="field-error" role="alert">
              {errors.name}
            </span>
          )}
          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              required
              maxLength={25}
              placeholder="e.g. 07700 900000"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              autoComplete="tel"
            />
          </label>
          {errors.phone && (
            <span id="phone-error" className="field-error" role="alert">
              {errors.phone}
            </span>
          )}
          <label>
            Delivery address
            <textarea
              name="address"
              required
              minLength={10}
              maxLength={500}
              placeholder="Street, building number and city"
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              autoComplete="street-address"
              rows={3}
            />
          </label>
          {errors.address && (
            <span id="address-error" className="field-error" role="alert">
              {errors.address}
            </span>
          )}
          <div className="total">
            <span>Total</span>
            <strong>{money(cart.totalAmount)}</strong>
          </div>
          <button className="primary" type="submit">
            Complete demo order <Icon name="arrow" />
          </button>
          <button
            type="button"
            className="back"
            onClick={() => setStage("cart")}
          >
            Back to cart
          </button>
        </form>
      ) : cart.items.length ? (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.id} className="cart-row">
                {mealsById.get(item.id) && (
                  <img
                    src={photo(mealsById.get(item.id)?.image ?? "", 160)}
                    width={160}
                    height={120}
                    alt=""
                  />
                )}
                <div>
                  <h3>{item.name}</h3>
                  <strong>{money(item.price * item.amount)}</strong>
                </div>
                <div className="quantity">
                  <button
                    onClick={() => cart.removeItem(item.id)}
                    aria-label={`${item.name} decrease`}
                  >
                    −
                  </button>
                  <span>{item.amount}</span>
                  <button
                    onClick={() => cart.addItem({ ...item, amount: 1 })}
                    aria-label={`${item.name} increase`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{money(cart.totalAmount)}</strong>
          </div>
          <p className="demo-note">
            Sample menu and prices · No real payment is taken.
          </p>
          <button className="primary wide" onClick={() => setStage("checkout")}>
            Continue to checkout <Icon name="arrow" />
          </button>
        </>
      ) : (
        <div className="empty-state">
          <Icon name="bag" size={40} />
          <h3>Your next great bite awaits.</h3>
          <p>Pick your favourites from the menu to fill your cart.</p>
          <button className="primary" onClick={() => onClose()}>
            Explore the menu
          </button>
        </div>
      )}
    </dialog>
  );
}
