import type { OptionalIngredient } from '../api/models';

export const calculateIngredientsTotalPrice = (
    ids: number[],
    ingredients: OptionalIngredient[]
): number => {
    let totalPrice = 0;
    ingredients.forEach((ingredient) => {
        if (ids.includes(ingredient.id)) totalPrice += ingredient.price;
    });
    return totalPrice;
};
