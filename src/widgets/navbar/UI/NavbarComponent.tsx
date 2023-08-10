import { Container, Logo, Button } from '~/shared/ui';

import classes from './NavbarComponent.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect, useRef } from 'react';

interface NavbarComponentProps {
    categories: { name: string; isActive: boolean }[];
    cartTotalItems: number;
}

export const NavbarComponent = ({
    categories,
    cartTotalItems,
}: NavbarComponentProps) => {
    const navigate = useNavigate();

    const location = useLocation();

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref) {
            //@ts-ignore
            // eslint-disable-next-line no-unsafe-optional-chaining
            const children = [...ref.current?.children[1].children];
            const scrollableEl = ref.current;
            children.forEach((el) => {
                if (el.className.split(' ').indexOf(classes.active) >= 0) {
                    const offsetLeft = el.offsetLeft;
                    const offsetLeftByRight =
                        offsetLeft + el.getBoundingClientRect().width;
                    if (
                        !(
                            offsetLeft >
                            // @ts-ignore
                            scrollableEl?.scrollLeft &&
                            offsetLeftByRight <
                            //@ts-ignore
                            scrollableEl?.scrollLeft +
                            //@ts-ignore
                            scrollableEl?.getBoundingClientRect().width
                        )
                    ) {
                        // @ts-ignore
                        scrollableEl.scrollLeft = offsetLeft;
                    }
                }
            });
        }
    }, [categories]);

    return (
        <div
            className="fixed left-0 right-0 top-0 z-10"
            style={{ background: 'rgba(255, 255, 255, .8)' }}
        >
            <Container className="px-0 md:px-4">
                <div ref={ref} className="flex justify-start md:justify-between gap-4 md:gap-0 w-full overflow-x-auto whitespace-nowrap">
                    <div className="flex min-w-fit">
                        <Logo />
                    </div>
                    <div className="flex" style={{ minHeight: '64px' }}>
                        {categories.map((category) => {
                            return (
                                <a
                                    className={`cursor-pointer mr-6 last:mr-0 hover:text-primary transition-colors ease-in-out duration-125 h-full flex items-center justify-center
                                    ${category.isActive ? classes.active : ''}`}
                                    key={category.name}
                                    href={'#' + category.name}
                                >
                                    <span className="font-header text-lg">
                                        {category.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                    <div className="hidden md:flex items-center">
                        <Button
                            size="default"
                            type="primary"
                            onClick={() => navigate('/cart')}
                        >
                            Cart
                            {cartTotalItems > 0 && (
                                <span>| {cartTotalItems}</span>
                            )}
                        </Button>
                    </div>
                    {location.pathname === '/' && (
                        <button
                            className="block fixed md:hidden bottom-8 right-8 z-20 "
                            onClick={() => navigate('/cart')}
                        >
                            <div
                                className="rounded-full bg-white p-2 relative"
                                style={{
                                    boxShadow:
                                        '0px 0px 6px 0px rgba(0, 0, 0, 0.12)',
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8 text-primary"
                                >
                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>
                                {cartTotalItems > 0 && (
                                    <div className="absolute rounded-full px-1.5 py-0.5 -top-1 -right-2 bg-primary font-semibold text-white text-xs">
                                        {cartTotalItems}
                                    </div>
                                )}
                            </div>
                        </button>
                    )}
                </div>
            </Container>
        </div>
    );
};
