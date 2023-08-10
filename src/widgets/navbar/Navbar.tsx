import { NavbarComponent } from './UI/NavbarComponent';
import { Category } from './types';

import { useAppSelector } from '~/app';

import { calculateTotalItems } from '~/entities/cart/lib';
import { useEffect, useState } from 'react';

import { isSectionInView } from '~/shared/lib';

// interface NavbarProps {
//     categories: string[];
// }

export const Navbar = () => {
    const [categories, setCategories] = useState([
        { name: 'Pizza', isActive: true },
        { name: 'Snacks', isActive: false },
        { name: 'Drinks', isActive: false },
        { name: 'Desserts', isActive: false },
        { name: 'Combos', isActive: false },
    ] as Category[]);

    useEffect(() => {
        window.onscroll = () => {
            setCategories(
                categories.map((category) => {
                    return {
                        name: category.name,
                        isActive: isSectionInView(category.name),
                    };
                }) as Category[]
            );
        };
    }, []);

    const { items } = useAppSelector((state) => state.cart);
    return (
        <NavbarComponent
            categories={categories}
            cartTotalItems={calculateTotalItems(items)}
        />
    );
};
