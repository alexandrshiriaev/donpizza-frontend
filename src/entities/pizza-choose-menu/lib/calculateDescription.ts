import { PizzaVariants } from '~/shared/api/models';

export const calculateDescription = (
    chosenVariant: string[],
    variants: PizzaVariants
) => {
    const defaultSizes = {
        small: '25 cm',
        medium: '30 cm',
        large: '35 cm',
    };

    const sizePartDescription =
        //@ts-ignore
        defaultSizes[chosenVariant[0]] || capitalizeWords(chosenVariant[0]);

    let description = sizePartDescription + ', ';
    description +=
        chosenVariant[1] === 'traditional'
            ? 'traditional dough, '
            : 'thin dough, ';

    description += variants[chosenVariant[0]][chosenVariant[1]].weight + ' g';

    return description;
};
