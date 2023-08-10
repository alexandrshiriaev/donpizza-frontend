import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PizzaChooseMenu from '~/entities/pizza-choose-menu/';
import { Button, Modal } from '~/shared/ui';

import { addToCart } from '~/features/cart';

import * as types from '~/shared/api/models';

import classes from './ProductModal.module.css';
import { fetchProductById } from '../api';

import { API_URL } from '~/shared/config';

export const ProductModal = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState<
        types.OtherProduct | types.PizzaProduct | undefined
    >();

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchProductById(parseInt(id || '-1'))
            .then((response) => {
                setProduct(response);
            })
            .catch(() => setIsError(true));
    }, []);

    if (isError) {
        return <Navigate to="/" />;
    }

    let pizzaProduct;
    let otherProduct;

    if (product) {
        if (product.categoryId === 1) {
            pizzaProduct = product as types.PizzaProduct;
        } else {
            otherProduct = product as types.OtherProduct;
        }
    }

    return (
        <>
            {product && (
                <>
                    {pizzaProduct && (
                        <Modal
                            leftSide={
                                <div className="p-8 grid justify-center">
                                    <img
                                        className="w-full h-auto"
                                        src={`${API_URL}/${product.imgPath}`}
                                        alt="product-img"
                                        style={{ maxWidth: '512px' }}
                                    />
                                </div>
                            }
                            rightSide={
                                <div className="relative">
                                    <PizzaChooseMenu
                                        //@ts-ignore
                                        id={pizzaProduct?.id}
                                        //@ts-ignore
                                        initialIngredients={
                                            pizzaProduct?.initialIngredients
                                        }
                                        //@ts-ignore
                                        lowestPrice={pizzaProduct?.lowestPrice}
                                        //@ts-ignore
                                        name={pizzaProduct?.name}
                                        //@ts-ignore
                                        optionalIngredients={
                                            pizzaProduct?.optionalIngredients
                                        }
                                        //@ts-ignore
                                        variants={pizzaProduct?.variants}
                                        onSubmit={async (
                                            productId,
                                            description,
                                            chosenVariant,
                                            removedIngredients,
                                            addedIngredients
                                        ) => {
                                            navigate('/');
                                            await addToCart(
                                                productId,
                                                description,
                                                chosenVariant,
                                                removedIngredients,
                                                addedIngredients
                                            );
                                        }}
                                    />
                                </div>
                            }
                            onClose={() => {
                                navigate('/');
                            }}
                            className={`overflow-auto ${classes.gridCotainer}`}
                        />
                    )}
                    {otherProduct && (
                        <Modal
                            leftSide={
                                <div className="p-8 grid justify-center">
                                    <img
                                        className="w-full h-auto"
                                        src={`${API_URL}/${product.imgPath}`}
                                        alt="product-img"
                                        style={{ maxWidth: '512px' }}
                                    />
                                </div>
                            }
                            rightSide={
                                <div className="py-8 relative min-h-full">
                                    <div className="overflow-y-auto px-8">
                                        <h2 className="font-header text-2xl">
                                            {product.name}
                                        </h2>
                                        {
                                            //@ts-ignore
                                            !!product.additionalDescription && (
                                                <h3 className="text-neutral font-light">
                                                    {
                                                        //@ts-ignore
                                                        product.additionalDescription
                                                    }
                                                </h3>
                                            )
                                        }
                                        <h3>
                                            {
                                                //@ts-ignore
                                                product.description
                                            }
                                        </h3>
                                    </div>
                                    <div className="px-8 pt-8 absolute bottom-8 left-0 w-full">
                                        <Button
                                            className="w-full"
                                            size="default"
                                            type="primary"
                                            onClick={async () => {
                                                navigate('/');
                                                await addToCart(product.id);
                                            }}
                                        >
                                            Add to cart for $
                                            {product.lowestPrice}
                                        </Button>
                                    </div>
                                </div>
                            }
                            onClose={() => {
                                navigate('/');
                            }}
                            className={`overflow-auto ${classes.gridCotainer}`}
                        />
                    )}
                </>
            )}
        </>
    );
};
