import * as types from '~/shared/api/models';
import { Button } from '~/shared/ui';
import { addToCart } from '~/features/cart';
import { adjustStrings } from '~/shared/lib';

import Product from '~/entities/product';

import { useNavigate } from 'react-router-dom';

import {BASE_URL} from '~/shared/config';

interface ProductsListProps {
    products: types.Product[];
    listId: string;
}

export const ProductsList = ({ products, listId }: ProductsListProps) => {
    const navigate = useNavigate();

    return (
        <div
            id={listId}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {products.map((product) => {
                const isPizza = product.categoryId === 1;
                const pizzaProduct = product as types.PizzaProduct;
                const otherProduct = product as types.OtherProduct;

                const productDescription = isPizza
                    ? adjustStrings(
                          pizzaProduct.initialIngredients.map(
                              (ingredient) => ingredient.name
                          ),
                          true
                      )
                    : otherProduct.description;

                const footer = (
                    <>
                        <Button
                            type="primary"
                            size="default"
                            onClick={() => {
                                if (isPizza)
                                    return navigate('products/' + product.id);
                                return addToCart(product.id);
                            }}
                        >
                            {isPizza ? 'Choose' : 'Add to cart'}
                        </Button>
                        <div>
                            {isPizza && <span className="text-lg">from </span>}
                            <span className="text-2xl font-bold">
                                ${product.lowestPrice}
                            </span>
                        </div>
                    </>
                );

                return (
                    <Product
                        key={product.id}
                        description={productDescription}
                        footer={footer}
                        header={
                            <img
                                alt="product img"
                                src={`${BASE_URL}/${product.imgPath}`}
                                className="h-auto pointer cursor-pointer"
                                style={{}}
                                onClick={() => {
                                    navigate('products/' + product.id);
                                }}
                            />
                        }
                        name={product.name}
                        tag={product.tag}
                    ></Product>
                );
            })}
        </div>
    );
};
