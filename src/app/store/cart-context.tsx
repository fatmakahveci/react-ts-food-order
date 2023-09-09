'use client';

import { ItemValue } from '@/shared/types/Types';
import { Context, createContext } from 'react';

const CartContext: Context<ItemValue> = createContext<ItemValue>({
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {}
});

export default CartContext;