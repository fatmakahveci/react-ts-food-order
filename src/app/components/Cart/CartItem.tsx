'use client';

import { CartItemProps } from '@/shared/types/Types';
import { FC } from 'react';
import './CartItem.css';

const CartItem: FC<CartItemProps> = ({ amount, key, name, onAdd, onRemove, price }): JSX.Element => {

  return (
    <li className="cart-item" key={key}>
      <div>
        <h2>{name}</h2>
        <div className="summary">
          <span className="price">${price.toFixed(2)}</span>
          <span className="amount">x {amount}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  )
}
export default CartItem;