import { useEffect, useState } from 'react';
import _ from 'lodash';

import { adjustStrings } from '~/shared/lib';
import { BASE_URL } from '~/shared/config';

import { useAppDispatch, useAppSelector } from '~/app';

import {
    calculateItemsPriceSum,
    getIngredientNamesByIds,
    calculateTotalItems,
    calculateTotalPizzaPrice,
} from '../lib';
import { PizzaCartItem } from '..';
import CountChangeButton from './CountChangeButton.tsx';

import {
    increaseItemCountByIndex,
    decreaseItemCountByIndex,
    removeItemByIndex,
} from '../model/slice.ts';
import { Button } from '~/shared/ui';

export const Cart = () => {
    const { items } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const [totalPrice, setTotalPrice] = useState<number>(
        items ? calculateItemsPriceSum(items) : 0
    );

    const [totalItems, setTotalItems] = useState(calculateTotalItems(items));

    useEffect(() => {
        setTotalPrice(calculateItemsPriceSum(items));
        setTotalItems(calculateTotalItems(items));
    }, [items]);

    return (
        <div className="h-screen relative">
            <div className="absolute top-0 right-0 left-0 w-full bg-secondary h-16 flex items-center justify-start p-4">
                <h2 className="text-lg font-semibold">
                    {totalItems} items at the price of ${totalPrice}
                </h2>
            </div>
            <div className="h-full pt-16 pb-44">
                <div className=" overflow-auto h-full">
                    <div className="grid grid-cols-1 gap-2">
                        {items &&
                            items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="bg-white px-4 pt-2"
                                    >
                                        <div className="flex gap-2 mb-4">
                                            <div>
                                                <img
                                                    src={`${BASE_URL}/${item.imgPath}`}
                                                    alt="product image"
                                                    style={{
                                                        maxWidth: '64px',
                                                        height: 'auto',
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h2 className="font-header text-lg">
                                                    {item.name}
                                                </h2>
                                                <p className="text-sm text-neutral mb-1 whitespace-pre-wrap">
                                                    {item.description}
                                                </p>
                                                {item.categoryId === 1 && (
                                                    <>
                                                        {
                                                            //@ts-ignore
                                                            item
                                                                .removedIngredients
                                                                .length > 0 && (
                                                                <p className="text-neutral text-sm mb-1">
                                                                    -{''}
                                                                    {adjustStrings(
                                                                        getIngredientNamesByIds(
                                                                            //@ts-ignore
                                                                            item.removedIngredients,
                                                                            //@ts-ignore
                                                                            item.initialIngredients
                                                                        ),
                                                                        false
                                                                    )}
                                                                </p>
                                                            )
                                                        }
                                                        {
                                                            //@ts-ignore
                                                            item
                                                                .addedIngredients
                                                                .length > 0 && (
                                                                <p className="text-neutral text-sm">
                                                                    +{''}
                                                                    {adjustStrings(
                                                                        getIngredientNamesByIds(
                                                                            //@ts-ignore
                                                                            item.addedIngredients,
                                                                            //@ts-ignore
                                                                            item.optionalIngredients
                                                                        ),
                                                                        false
                                                                    )}
                                                                </p>
                                                            )
                                                        }
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="flex justify-between py-4"
                                            style={{
                                                borderTop: '1px solid #F2F3F3',
                                            }}
                                        >
                                            <h3 className="text-lg font-semibold">
                                                $
                                                {_.floor(
                                                    item.categoryId === 1
                                                        ? calculateTotalPizzaPrice(
                                                        item as PizzaCartItem
                                                    ) * item.count
                                                        : item.lowestPrice *
                                                        item.count,
                                                    1
                                                )}
                                            </h3>
                                            <CountChangeButton
                                                id={index}
                                                currentCount={item.count}
                                                onIncrease={(index) =>
                                                    dispatch(
                                                        increaseItemCountByIndex(
                                                            index
                                                        )
                                                    )
                                                }
                                                onDecrease={(index) => {
                                                    if (item.count === 1) {
                                                        dispatch(
                                                            removeItemByIndex(
                                                                index
                                                            )
                                                        );
                                                    } else {
                                                        dispatch(
                                                            decreaseItemCountByIndex(
                                                                index
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div
                className="bg-white absolute h-44 bottom-0 left-0 right-0 px-4"
                style={{
                    boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.12)',
                }}
            >
                <div className="py-2 text-sm font-semibold">
                    <div className="flex justify-between">
                        <p>Delivery</p>
                        <p>$0</p>
                    </div>
                    <div className="flex justify-between">
                        <p>{totalItems} items</p>
                        <p>${totalPrice}</p>
                    </div>
                </div>
                <h2
                    className="flex justify-between py-4 text-lg font-semibold"
                    style={{ borderTop: '1px solid #F2F3F3' }}
                >
                    <p>Total</p>
                    <p>${totalPrice}</p>
                </h2>
                <Button type="primary" size="default" className="w-full">
                    Checkout
                </Button>
            </div>
        </div>
    );
};