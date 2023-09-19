import { HTMLInputTypeAttribute, ReactNode, Ref } from 'react';

export type BackdropProps = {
    onClose: () => void;
};

export type ButtonProps = {
    type: 'submit' | 'reset' | 'button' | undefined;
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type CardProps = {
    cssName: string;
    children: ReactNode;
};

export type CartAction =
  | { type: 'ADD'; item: CartItemProps }
  | { type: 'REMOVE'; id: string };

export type CartItemProps = {
    amount: number;
    id?: any;
    key?: string;
    name: string;
    onAdd?: () => void;
    onRemove?: () => void;
    price: number;
};

export type CartProps = {
    onClose: () => void;
};

export type CartProviderProps = {
    children: ReactNode;
};

export type CartState = {
    items: CartItemProps[],
    totalAmount: number,
};

export type HeaderCartButtonProps = {
    onClick: () => void;
};

export type HeaderProps = {
    onShowCart: () => void;
};

export type InputProps = {
    label: string;
    input: {
        id: string;
        type: HTMLInputTypeAttribute;
        min: string;
        max: string;
        step: string;
        defaultValue: string;
    };
    ref?: Ref<HTMLInputElement> | null;
};

export type ItemValue = {
    items: CartItemProps[],
    totalAmount: number,
    addItem: (item: CartItemProps) => void,
    removeItem: (id: string) => void
};

export type Meal = {
    description: string;
    id?: string;
    name: string;
    price: number;
};

export type MealItemFormProps = {
    id: string | undefined;
    onAddToCart: (amount: number) => void;
};

export type ModalOverlayProps = {
    children: ReactNode;
};

export type ModalProps = {
    onClose: () => void;
    children: ReactNode;
};