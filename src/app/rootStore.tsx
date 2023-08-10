import { combineReducers } from '@reduxjs/toolkit';

import { productsSectionSlice } from '~/widgets/products-section';
import { cartSlice } from '~/entities/cart';

export const rootReducer = combineReducers({
    [productsSectionSlice.name]: productsSectionSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
});
