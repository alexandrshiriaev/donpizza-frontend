import { products, categories } from '~/shared/api';

export const fetchAllCategories = async () => {
    return (await categories.getCategories()).data;
};

export const fetchProductsById = async (id: number) => {
    return (await products.getProductsByCategory(id)).data;
};