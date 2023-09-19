'use client';

import { ButtonProps } from '@/shared/types';
import { FC } from 'react';
import './Button.css';

const Button: FC<ButtonProps> = ({ type, children, onClick }) => {
  return (
    <button
        className="button"
        type={type || 'button'}
        onClick={onClick}
    >
    {children}
    </button>
  )
}
export default Button;