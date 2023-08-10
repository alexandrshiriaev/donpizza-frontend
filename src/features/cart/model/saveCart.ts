import { appStore } from '~/app';

import { saveCartToLocalStorage } from '~/entities/cart';

export const saveCart = () => {
    const { items } = appStore.getState().cart;
    saveCartToLocalStorage(items);
};
