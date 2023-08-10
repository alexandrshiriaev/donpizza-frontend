import { CartItem, PizzaCartItem } from '~/entities/cart';

import _ from 'lodash';

export const findEqualItemIndex = (
    productId: number,
    categoryId: number,
    item: CartItem | PizzaCartItem,
    cartItems: (CartItem | PizzaCartItem)[]
) => {
    let result = -1;
    if (categoryId === 1) {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].categoryId !== categoryId) continue;
            if (
                _.isEqual(_.omit(cartItems[i], 'count'), _.omit(item, 'count'))
            ) {
                result = i;
                break;
            }
        }
    } else {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].categoryId !== categoryId) continue;
            if (cartItems[i].productId === productId) {
                result = i;
                break;
            }
        }
    }
    return result;
};
