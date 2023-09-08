import { HTMLInputTypeAttribute, ReactNode } from 'react';

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
};

export type ModalProps = {
    errorMessage: ErrorMessage;
    onConfirm: () => void;
};

export type Meal = {
    description: string;
    id?: string;
    name: string;
    price: number;
};