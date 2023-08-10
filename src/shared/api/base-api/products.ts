import type { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import type { Product } from './models';

const BASE_URL = '/products';

export const getProductsByCategory = (
    categoryId: number
): AxiosPromise<Product[]> => {
    return apiInstance.get(`${BASE_URL}?categoryId=${categoryId}`);
};

export const getProductById = (productId: number): AxiosPromise<Product> => {
    return apiInstance.get(`${BASE_URL}/${productId}`);
};
