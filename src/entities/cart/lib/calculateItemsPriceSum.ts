import { CartItem, PizzaCartItem } from '~/entities/cart';
import { calculateTotalPizzaPrice } from '.';

import _ from 'lodash';

export const calculateItemsPriceSum = (items: (CartItem | PizzaCartItem)[]) => {
    let totalSum = 0;
    items.forEach((item) => {
        if (item.categoryId === 1) {
            totalSum +=
                calculateTotalPizzaPrice(item as PizzaCartItem) * item.count;
        } else {
            totalSum += item.lowestPrice * item.count;
        }
    });
    return _.floor(totalSum, 1);
};
