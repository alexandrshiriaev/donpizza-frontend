import { PizzaVariants } from '~/shared/api/models';

export const findFirstAvailableInSize = (
    size: string,
    variants: PizzaVariants
): string => {
    let result = '';
    const objArr = Object.entries(variants[size]);

    for (let i = 0; i < objArr.length; i++) {
        if (objArr[i][1].isAvailable) result = objArr[i][0];
        break;
    }

    return result;
};
