import _ from 'lodash';

import { calculateIngredientsTotalPrice } from '~/shared/lib';

import type { PizzaCartItem } from '~/entities/cart';

export const calculateTotalPizzaPrice = (pizzaItem: PizzaCartItem) => {
    let totalPrice = pizzaItem.lowestPrice;
    totalPrice +=
        pizzaItem.variants[pizzaItem.chosenVariant[0]][
            pizzaItem.chosenVariant[1]
        ].priceDifference;

    totalPrice += calculateIngredientsTotalPrice(
        pizzaItem.addedIngredients,
        pizzaItem.optionalIngredients
    );
    return _.floor(totalPrice, 1);
};
