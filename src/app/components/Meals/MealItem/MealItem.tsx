'use client';

import { Meal } from '@/shared/types/Types';
import { FC } from 'react';
import './MealItem.css';

const MealItem: FC<Meal> = ({ description, id, key, name, price }): JSX.Element => {
  price = `$${price.toFixed(2)}`;

  return (
    <li className="meal">
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">{price}</div>
        <div>
          
        </div>
      </div>
    </li>
  )
}
export default MealItem;