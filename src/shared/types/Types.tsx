import { ReactNode } from 'react';

export type BackdropProps = {
    onConfirm: () => void;
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

export type ErrorMessage = {
    title: string;
    message: string;
};

export type ModalProps = {
    errorMessage: ErrorMessage;
    onConfirm: () => void;
};

export type Meal = {
    description: string;
    id: string;
    key?: string;
    name: string;
    price: number;
};