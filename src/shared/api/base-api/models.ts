export type Category = {
    id: number;
    name: string;
};

export interface IProduct {
    id: number;
    categoryId: number;
    imgPath: string;
    name: string;
    lowestPrice: number;
    tag: Tag | undefined;
}

export type Ingredient = {
    id: number;
    name: string;
};

export type InitialIngredient = Ingredient & {
    canBeRemoved: boolean;
};

export type OptionalIngredient = Ingredient & {
    price: number;
};

export type PizzaVariants = {
    [size: string]: {
        [thickness: string]: {
            isAvailable: boolean;
            weight: number;
            default: boolean;
            priceDifference: number;
        };
    };
};

export type PizzaProduct = IProduct & {
    initialIngredients: InitialIngredient[];
    optionalIngredients: OptionalIngredient[];
    variants: PizzaVariants;
};

export type OtherProduct = IProduct & {
    description: string;
    additionalDescription: string;
};

export type Tag = {
    value: string;
    bgColor: string;
    textColor: string;
};

export type Product = OtherProduct | PizzaProduct;
