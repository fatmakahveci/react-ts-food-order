'use client';

import { Meal } from '@/shared/types/Types';
import { FC } from 'react';
import './MealItem.css';
import MealItemForm from './MealItemForm';

const MealItem: FC<Meal> = ({ description, id, name, price }): JSX.Element => {

  return (
    <li key={id} className="meal">
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">${price.toFixed(2)}</div>
      </div>
      <div  className="meal">
        <MealItemForm />
      </div>
    </li>
  )
}
export default MealItem;