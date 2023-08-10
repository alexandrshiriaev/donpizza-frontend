export const getIngredientNamesByIds = (
    ids: number[],
    ingredients: Required<{ id: number; name: string }>[]
): string[] => {
    const names = [] as string[];
    ingredients.forEach((ingredient) => {
        if (ids.includes(ingredient.id)) names.push(ingredient.name);
    });
    return names;
};
