import type { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import type { Category } from './models';

const BASE_URL = '/categories';

export const getCategories = (): AxiosPromise<Category[]> => {
    return apiInstance.get(BASE_URL);
};

export const getCategoryById = (categoryId: number): AxiosPromise<Category> => {
    return apiInstance.get(`${BASE_URL}/${categoryId}`);
};
