import React from 'react';

export type ButtonType =
    | 'primary'
    | 'secondary'
    | 'outlined'
    | 'outlined-selected';
export type ButtonSize = 'default' | 'small';

interface ButtonProps {
    children: 'string' | React.ReactNode;
    type: ButtonType;
    size: ButtonSize;
    onClick?(): void;
    className?: string;
}

const bgColor = {
    primary: 'bg-primary',
    outlined: 'bg-transparent',
    'outlined-selected': 'bg-transparent',
    secondary: 'bg-secondary',
};

const borderColor = {
    primary: 'border-primary',
    outlined: 'border-neutral',
    'outlined-selected': 'border-primary',
    secondary: 'border-secondary',
};

const textColor = {
    primary: 'text-white',
    outlined: 'text-neutral',
    'outlined-selected': 'text-neutral',
    secondary: 'text-neutral',
};

export const Button = ({
    children,
    type,
    size,
    onClick,
    className,
}: ButtonProps) => {
    const notOnlyChild = React.Children.count(children) > 1;

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-1.5 ${
                bgColor[type]
            } ${borderColor[type]} border-2 ${textColor[type]} ${
                notOnlyChild ? 'px-4' : 'px-6'
            } ${size === 'default' && 'py-1.5 font-bold text-lg'} ${
                size === 'small' && 'py-1 font-semibold text-sm'
            } rounded-3xl ${className}`}
        >
            {children}
        </button>
    );
};
