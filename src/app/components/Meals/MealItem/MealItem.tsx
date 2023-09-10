'use client';

import { ItemValue, Meal } from '@/shared/types/Types';
import { FC, useContext } from 'react';
import './MealItem.css';
import MealItemForm from './MealItemForm';
import CartContext from '@/app/store/cart-context';

const MealItem: FC<Meal> = ({ description, id, name, price }): JSX.Element => {
  const cartCtx: ItemValue = useContext<ItemValue>(CartContext);

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price
    });
  };

  return (
    <li key={id} className="meal">
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">${price.toFixed(2)}</div>
      </div>
      <div  className="meal">
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}
export default MealItem;