import { products } from '~/shared/api';

export const fetchProductById = async (id: number) => {
    return (await products.getProductById(id)).data;
};