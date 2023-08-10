export {
    cartSlice,
    addItem,
    setItems,
    increaseItemCountByIndex,
    removeItemByIndex,
} from './model/slice';

export type { CartItem, PizzaCartItem } from './model/slice';

export { saveCartToLocalStorage } from './lib/saveCartToLocalStorage';

export { Cart } from './UI/Cart';
