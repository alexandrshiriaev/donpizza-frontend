import { InitialIngredient, OptionalIngredient } from '~/shared/api/models';

type MutationMixin = {
    isSelected: boolean;
};

export type MutatedInitialIngredient = InitialIngredient & MutationMixin;

export type MutatedOptionalIngredient = OptionalIngredient & MutationMixin;

export function mutateIngredients(
    ingredients: InitialIngredient[]
): MutatedInitialIngredient[];

export function mutateIngredients(
    ingredients: OptionalIngredient[]
): MutatedOptionalIngredient[];

export function mutateIngredients(
    ingredients: InitialIngredient[] | OptionalIngredient[]
): MutatedInitialIngredient[] | MutatedOptionalIngredient[] {
    return ingredients.map((ingredient) => {
        const newObj = {} as MutatedInitialIngredient;
        const objArr = Object.entries(ingredient);
        objArr.push(['isSelected', false]);

        Object.assign(newObj, Object.fromEntries(objArr));

        return newObj;
    });
}
