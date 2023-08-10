import { MutatedInitialIngredient, MutatedOptionalIngredient } from '.';

export function toggleSelectedIngredientById(
    id: number,
    ingredients: MutatedInitialIngredient[]
): MutatedInitialIngredient[];

export function toggleSelectedIngredientById(
    id: number,
    ingredients: MutatedOptionalIngredient[]
): MutatedOptionalIngredient[];

export function toggleSelectedIngredientById(
    id: number,
    ingredients: MutatedInitialIngredient[] | MutatedOptionalIngredient[]
): MutatedInitialIngredient[] | MutatedOptionalIngredient[] {
    return ingredients.map((ingredient) => {
        if (ingredient.id === id) {
            ingredient.isSelected = !ingredient.isSelected;
        }
        return ingredient;
    }) as MutatedInitialIngredient[] | MutatedOptionalIngredient[];
}
