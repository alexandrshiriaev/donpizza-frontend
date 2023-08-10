import { PizzaVariants } from '~/shared/api/models';

export const getDefaultVariant = (variants: PizzaVariants): string[] => {
    let defaultVariant = ['none', 'none'];

    Object.entries(variants).forEach((variant) => {
        const thicknessArr = Object.entries(variant[1]);
        for (let i = 0; i < thicknessArr.length; i++) {
            //@ts-ignore
            if (thicknessArr[i][1]['default'] === true) {
                defaultVariant = [variant[0], thicknessArr[i][0]];
            }
        }
    });

    return defaultVariant;
};
