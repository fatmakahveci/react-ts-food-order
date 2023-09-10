'use client';

import CartIcon from '@/app/components/Cart/CartIcon';
import CartContext from '@/app/store/cart-context';
import { HeaderCartButtonProps, ItemValue } from '@/shared/types/Types';
import { FC, useContext, useEffect, useState } from 'react';
import './HeaderCartButton.css';

const HeaderCartButton: FC<HeaderCartButtonProps> = ({ onClick }): JSX.Element => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState<boolean>(false);
  const cartCtx: ItemValue = useContext<ItemValue>(CartContext);

  const { items }: ItemValue = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={`button ${btnIsHighlighted ? 'bump' : ''}`} onClick={onClick}>
      <span className='icon'>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className='badge'>{numberOfCartItems}</span>
    </button>
  )
}
export default HeaderCartButton;