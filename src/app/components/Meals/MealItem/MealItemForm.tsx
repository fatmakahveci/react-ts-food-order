'use client';

import './MealItemForm.css';
import Input from '@/app/components/UI/Input';

const MealItemForm = (): JSX.Element => {
  return (
    <form className="form">
      <Input
          label="Amount"
          input={{
            id: 'amount',
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
          }}
        />
      <button>+ Add</button>
    </form>
  )
}
export default MealItemForm;