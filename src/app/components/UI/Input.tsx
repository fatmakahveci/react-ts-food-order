'use client';

import { InputProps } from '@/shared/types';
import { FC, forwardRef } from 'react';
import './Input.css';

const Input: FC<InputProps> = forwardRef(({label, input}, ref) => {
  return (
    <div className="input">
      <label htmlFor={input["id"]}>{label}</label>
      <input
        id={`amount_${input["id"]}`}
        type={input["type"]}
        min={input["min"]}
        max={input["max"]}
        ref={ref}
        step={input["step"]}
        defaultValue={input["defaultValue"]}
      />
    </div>
  )
});

export default Input;