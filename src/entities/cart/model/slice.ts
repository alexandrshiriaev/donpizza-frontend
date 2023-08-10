import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type {
    InitialIngredient,
    OptionalIngredient,
    PizzaVariants,
} from '~/shared/api/models';

import { loadCartFromLocalStorage } from '../lib';

export type CartItem = {
    imgPath: string;
    productId: number;
    categoryId: number;
    name: string;
    description: string;
    count: number;
    lowestPrice: number;
};

export type PizzaCartItem = CartItem & {
    chosenVariant: string[];
    variants: PizzaVariants;
    initialIngredients: InitialIngredient[];
    optionalIngredients: OptionalIngredient[];
    removedIngredients: number[];
    addedIngredients: number[];
};

interface CartState {
    items: (CartItem | PizzaCartItem)[];
}

const initialState = {
    items: loadCartFromLocalStorage(),
} as CartState;

export const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        setItems(state, action: PayloadAction<(CartItem | PizzaCartItem)[]>) {
            state.items = action.payload;
        },
        addItem(state, action: PayloadAction<CartItem | PizzaCartItem>) {
            state.items.push(action.payload);
        },
        removeItemByIndex(state, action: PayloadAction<number>) {
            state.items.splice(action.payload, 1);
        },
        decreaseItemCountByIndex(state, action: PayloadAction<number>) {
            state.items[action.payload].count -= 1;
        },
        increaseItemCountByIndex(state, action: PayloadAction<number>) {
            state.items[action.payload].count += 1;
        },
    },
});

export const {
    setItems,
    addItem,
    removeItemByIndex,
    increaseItemCountByIndex,
    decreaseItemCountByIndex,
} = cartSlice.actions;
