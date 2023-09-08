'use client';

import { Meal } from '@/shared/types/Types';
import { FC } from 'react';
import './MealItem.css';

const MealItem: FC<Meal> = ({ description, id, key, name, price }): JSX.Element => {

  return (
    <li className="meal">
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">${price.toFixed(2)}</div>
        <div>
          
        </div>
      </div>
    </li>
  )
}
export default MealItem;