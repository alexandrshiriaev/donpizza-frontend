import React from 'react';

import type { ButtonSize, ButtonType } from '~/shared/ui';

import { Button } from '~/shared/ui';

interface OptionalIngredientButtonProps {
    children: 'string' | React.ReactNode;
    type: ButtonType;
    size: ButtonSize;
    onClick?(): void;
    className?: string;
    labelText: string;
}

const OptionalIngredientButton = ({
    size,
    type,
    onClick,
    children,
    className,
    labelText,
}: OptionalIngredientButtonProps) => {
    return (
        <div>
            <Button
                size={size}
                type={type}
                onClick={onClick}
                className={`${className || ''} relative`}
            >
                <div className="absolute -right-2 -top-2 bg-primary text-white text-xs font-bold rounded-full px-1 py-0.5">
                    {labelText}
                </div>
                {children}
            </Button>
        </div>
    );
};

export default OptionalIngredientButton;
