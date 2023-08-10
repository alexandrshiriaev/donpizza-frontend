import { getLocalStorage } from '~/shared/lib';

export const loadCartFromLocalStorage = () => {
    return getLocalStorage('cartItems', []);
};
