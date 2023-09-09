'use client';

import CartItem from '@/app/components/Cart/CartItem';
import Modal from '@/app/components/UI/Modal';
import CartContext from '@/app/store/cart-context';
import { CartItemProps, CartProps, ItemValue } from '@/shared/types/Types';
import { FC, useContext } from 'react';
import './Cart.css';

const Cart: FC<CartProps> = ({ onClose }): JSX.Element => {
  const cartCtx: ItemValue = useContext<ItemValue>(CartContext);

  const totalAmount: string = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems: boolean = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string): void => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: CartItemProps): void => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems: JSX.Element = (
    <ul className="cart-items">
      {cartCtx.items.map((item: CartItemProps) =>(
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className="actions">
        <button className="button--alt" onClick={onClose}>
          Close
        </button>
        {hasItems && <button className="button">Order</button>}
      </div>
    </Modal>
  )
}
export default Cart;