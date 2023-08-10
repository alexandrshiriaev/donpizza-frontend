/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '~/app';

import ProductsList from '~/entities/products';
import { Container } from '~/shared/ui';

import { fetchAllCategories, fetchProductsById } from '../model/slice';

export const ProductsSection = () => {
    const { categories, products, categoriesStatus, productsStatus } =
        useAppSelector((state) => state.productsSection);
    const dispatch = useAppDispatch();

    const requestOrder = useRef([] as number[]);

    useEffect(() => {
        if (!categories.length && categoriesStatus !== 'pending') {
            dispatch(fetchAllCategories());
        }
    }, []);

    useEffect(() => {
        if (categories.length) {
            requestOrder.current = categories.map((category) => category.id);
        }
    }, [categories]);

    useEffect(() => {
        if (
            categories &&
            (productsStatus === 'idle' || productsStatus === 'succeded') &&
            requestOrder.current.length
        ) {
            //@ts-ignore
            dispatch(fetchProductsById(requestOrder.current.shift()));
        }
    }, [categories, productsStatus]);

    return (
        <Container className="px-4 pb-4">
            {categories.map((category) => {
                return (
                    <div
                        className="first:pt-24 pt-16"
                        key={category.name}
                        id={category.name}
                    >
                        <h2 className="text-neutral text-4xl font-semibold mb-4">
                            {category.name}
                        </h2>
                        <ProductsList
                            listId={category.name}
                            products={products[category.id] || []}
                        ></ProductsList>
                    </div>
                );
            })}
        </Container>
    );
};
