import { products } from '~/shared/api';

import { PizzaProduct, OtherProduct } from '~/shared/api/models';

export const getProductById = async (id: number) => {
    let product: OtherProduct | PizzaProduct | undefined = undefined;

    try {
        product = (await products.getProductById(id)).data;
    } catch (e) {
        console.log(e);
    }
    return product;
};
