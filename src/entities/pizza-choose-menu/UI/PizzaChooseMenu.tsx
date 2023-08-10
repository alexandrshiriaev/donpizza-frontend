import { useEffect, useState } from 'react';

import _ from 'lodash';

import { Button, Switch, XMark } from '~/shared/ui';
import { capitalizeWords, calculateIngredientsTotalPrice } from '~/shared/lib';

import OptionalIngredientButton from './OptionalIngredientButton';

import {
    calculateDescription,
    findFirstAvailableInSize,
    getDefaultVariant,
    mutateIngredients,
    toggleSelectedIngredientById,
    getSelectedIngredients,
} from '../lib';

import type { PizzaProduct } from '~/shared/api/models';

type PizzaChooseMenuProps = Pick<
    PizzaProduct,
    | 'id'
    | 'initialIngredients'
    | 'lowestPrice'
    | 'variants'
    | 'optionalIngredients'
    | 'name'
> & {
    onSubmit(
        productId: number,
        description?: string,
        chosenVariant?: string[],
        removedIngredients?: number[],
        addedIngredients?: number[]
    ): void;
};

export const PizzaChooseMenu = ({
    id,
    initialIngredients,
    lowestPrice,
    variants,
    optionalIngredients,
    name,
    onSubmit,
}: PizzaChooseMenuProps) => {
    const [currentDescription, setCurrentDescription] = useState<string>();

    const [chosenVariant, setChosenVariant] = useState(
        getDefaultVariant(variants)
    );

    const [mutatedInitialIngredients, setMutatedInitialIngredients] = useState(
        mutateIngredients(initialIngredients)
    );

    const [mutatedOptionalIngredients, setMutatedOptionalIngredients] =
        useState(mutateIngredients(optionalIngredients));

    const [currentPrice, setCurrentPrice] = useState(lowestPrice);
    const [ingredientsPrice, setIngredientsPrice] = useState<number>();
    const [sizeSwitchActiveKey, setSizeSwitchActiveKey] = useState<string>();

    const [thicknessSwitchActiveKey, setThicknessSwitchActiveKey] =
        useState<string>();

    useEffect(() => {
        const ids = [] as number[];

        mutatedOptionalIngredients.forEach((ingredient) => {
            if (ingredient.isSelected) return ids.push(ingredient.id);
        });

        setIngredientsPrice(
            calculateIngredientsTotalPrice(ids, optionalIngredients)
        );
    }, [mutatedOptionalIngredients]);

    useEffect(() => {
        const [size, thickness] = chosenVariant;
        setCurrentPrice(
            lowestPrice + variants[size][thickness].priceDifference
        );
    }, [chosenVariant]);

    useEffect(() => {
        const size = chosenVariant[0];
        setSizeSwitchActiveKey(size);
        if (!variants[size][chosenVariant[1]].isAvailable) {
            const availableThickness = findFirstAvailableInSize(size, variants);
            setThicknessSwitchActiveKey(availableThickness);
            setChosenVariant([size, availableThickness]);
        } else {
            setThicknessSwitchActiveKey(chosenVariant[1]);
        }
    }, [chosenVariant]);

    useEffect(() => {
        setCurrentDescription(calculateDescription(chosenVariant, variants));
    }, [chosenVariant]);

    return (
        <div className="py-8 relative">
            <div className="overflow-y-auto px-8" style={{ height: '500px' }}>
                <h2 className="font-header text-2xl">{name}</h2>
                <h3 className="text-neutral font-light mb-3">
                    {currentDescription}
                </h3>
                <div className="flex flex-col gap-3 mb-8">
                    <Switch
                        activeKey={sizeSwitchActiveKey || ''}
                        variants={Object.entries(variants).map((variant) => {
                            return {
                                key: variant[0],
                                value: capitalizeWords(variant[0]),
                                isAvailable: true,
                            };
                        })}
                        onSwitch={(variantKey) =>
                            setChosenVariant([variantKey, chosenVariant[1]])
                        }
                    />
                    <Switch
                        activeKey={thicknessSwitchActiveKey || ''}
                        variants={Object.entries(
                            variants[chosenVariant[0]]
                        ).map((variant) => {
                            return {
                                key: variant[0],
                                value: capitalizeWords(variant[0]),
                                isAvailable: variant[1].isAvailable,
                            };
                        })}
                        onSwitch={(variantKey) =>
                            setChosenVariant([chosenVariant[0], variantKey])
                        }
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">
                        Remove ingredients
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                        {mutatedInitialIngredients.map((ingredient, index) => {
                            if (!ingredient.canBeRemoved) {
                                return (
                                    <Button
                                        size="small"
                                        type="outlined"
                                        key={index}
                                    >
                                        {ingredient.name[0].toUpperCase() +
                                            ingredient.name.substring(1)}
                                    </Button>
                                );
                            } else {
                                return (
                                    <Button
                                        key={index}
                                        size="small"
                                        type={`${
                                            ingredient.isSelected
                                                ? 'secondary'
                                                : 'outlined-selected'
                                        }`}
                                        onClick={() => {
                                            return setMutatedInitialIngredients(
                                                toggleSelectedIngredientById(
                                                    ingredient.id,
                                                    mutatedInitialIngredients
                                                )
                                            );
                                        }}
                                    >
                                        {ingredient.name[0].toUpperCase() +
                                            ingredient.name.substring(1)}
                                        {!ingredient.isSelected && (
                                            <XMark className="w-4 h-4" />
                                        )}
                                    </Button>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">
                        Add ingredients
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                        {mutatedOptionalIngredients.map((ingredient, index) => {
                            return (
                                <OptionalIngredientButton
                                    key={index}
                                    size="small"
                                    type={`${
                                        ingredient.isSelected
                                            ? 'outlined-selected'
                                            : 'secondary'
                                    }`}
                                    onClick={() => {
                                        return setMutatedOptionalIngredients(
                                            toggleSelectedIngredientById(
                                                ingredient.id,
                                                mutatedOptionalIngredients
                                            )
                                        );
                                    }}
                                    labelText={`$${ingredient.price}`}
                                >
                                    {ingredient.name[0].toUpperCase() +
                                        ingredient.name.substring(1)}
                                    {ingredient.isSelected && (
                                        <XMark className="w-4 h-4" />
                                    )}
                                </OptionalIngredientButton>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="px-8 pt-8">
                <Button
                    className="w-full"
                    size="default"
                    type="primary"
                    onClick={() => {
                        onSubmit(
                            id,
                            currentDescription,
                            chosenVariant,
                            getSelectedIngredients(mutatedInitialIngredients),
                            getSelectedIngredients(mutatedOptionalIngredients)
                        );
                    }}
                >
                    Add to cart for $
                    {_.floor(currentPrice + (ingredientsPrice || 0), 1)}
                </Button>
            </div>
        </div>
    );
};
