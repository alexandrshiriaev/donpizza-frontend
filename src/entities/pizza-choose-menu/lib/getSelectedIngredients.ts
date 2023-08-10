import type { MutatedInitialIngredient, MutatedOptionalIngredient } from '.';

export const getSelectedIngredients = (
    ingredients: MutatedInitialIngredient[] | MutatedOptionalIngredient[]
) => {
    const selectedIds = [] as number[];
    ingredients.forEach((ingredient) => {
        if (ingredient.isSelected) selectedIds.push(ingredient.id);
    });
    return selectedIds;
};
