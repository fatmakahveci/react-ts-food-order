'use client';

import { InputProps } from '@/shared/types/Types';
import { FC } from 'react';
import './Input.css';

const Input: FC<InputProps> = ({ label, input}): JSX.Element => {
  return (
    <div className="input">
      <label htmlFor={input["id"]}>{label}</label>
      <input
        id={`amount_${input["id"]}`}
        type={input["type"]}
        min={input["min"]}
        max={input["max"]}
        step={input["step"]}
        defaultValue={input["defaultValue"]}
      />
    </div>        
  )
}
export default Input;