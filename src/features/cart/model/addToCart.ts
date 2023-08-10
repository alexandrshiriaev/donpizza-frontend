//@ts-nocheck

import { appStore } from '~/app';

import { addItem, increaseItemCountByIndex } from '~/entities/cart/';

import { getProductById } from '../api';
import { findEqualItemIndex } from '~/features/cart/lib';

export const addToCart = async (
    productId: number,
    description?: string,
    chosenVariant?: string[],
    removedIngredients?: number[],
    addedIngredients?: number[]
) => {
    const product = await getProductById(productId);

    const items = appStore.getState().cart.items;

    if (product) {
        const payload = {
            imgPath: product.imgPath,
            productId: productId,
            categoryId: product.categoryId,
            name: product.name,
            count: 1,
            lowestPrice: product.lowestPrice,
            description: description || product.description,
        };

        if (product.categoryId === 1) {
            payload['addedIngredients'] = addedIngredients;
            payload['removedIngredients'] = removedIngredients;
            payload['initialIngredients'] = product.initialIngredients;
            payload['optionalIngredients'] = product.optionalIngredients;
            payload['variants'] = product.variants;
            payload['chosenVariant'] = chosenVariant;
        }

        const index = findEqualItemIndex(
            product.id,
            product.categoryId,
            payload,
            items
        );

        if (index !== -1) {
            return appStore.dispatch(increaseItemCountByIndex(index));
        }

        return appStore.dispatch(addItem(payload));
    }
};
