import { setLocalStorage } from '~/shared/lib';
import { CartItem, PizzaCartItem } from '~/entities/cart';

export const saveCartToLocalStorage = (
    cartItems: (CartItem | PizzaCartItem)[]
) => {
    setLocalStorage('cartItems', cartItems);
};
