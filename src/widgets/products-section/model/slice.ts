import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api';

import * as types from '~/shared/api/models';

type requestStatus = 'idle' | 'pending' | 'succeded';

interface ProductsSectionState {
    categoriesStatus: requestStatus;
    productsStatus: requestStatus;
    categories: types.Category[];
    products: {
        [id: number]: types.Product[];
    };
}

export const fetchAllCategories = createAsyncThunk(
    'productsSection/fecthAllCategories',
    async (_, thunkAPI) => {
        return api
            .fetchAllCategories()
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error.response.data);
            });
    }
);

export const fetchProductsById = createAsyncThunk(
    'productsSection/fetchProductsById',
    async (id: number, thunkAPI) => {
        return api
            .fetchProductsById(id)
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error.response.data);
            });
    }
);

const initialState = {
    categoriesStatus: 'idle',
    productsStatus: 'idle',
    categories: [],
    products: {},
} as ProductsSectionState;

export const productsSectionSlice = createSlice({
    name: 'productsSection',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.categoriesStatus = 'pending';
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.categoriesStatus = 'succeded';
            });

        builder
            .addCase(fetchProductsById.pending, (state) => {
                state.productsStatus = 'pending';
            })
            .addCase(fetchProductsById.fulfilled, (state, action) => {
                state.productsStatus = 'succeded';
                const fetchedProducts = action.payload;
                if (fetchedProducts.length)
                    state.products[fetchedProducts[0].categoryId] =
                        fetchedProducts;
            });
    },
});
