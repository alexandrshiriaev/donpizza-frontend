import { useNavigate } from 'react-router-dom';

import { Cart } from '~/entities/cart';
import { CloseButton, MobileCloseButton, Overlay } from '~/shared/ui';

import classes from './CartMenu.module.css';

export const CartMenu = () => {
    const navigate = useNavigate();
    return (
        <>
            <div
                className={
                    'fixed top-0 right-0 h-screen z-30 w-full bg-secondary md:max-w-sm md:w-auto' +
                    classes.cartMenuContainer
                }
            >
                <div className="relative">
                    <div className="absolute -left-12 items-center justify-center h-screen hidden md:flex">
                        <CloseButton onClick={() => navigate('/')} />
                    </div>
                </div>
                <Cart />
                <MobileCloseButton
                    onClick={() => navigate('/')}
                    queryVisibilityClass="md:hidden"
                    positioningClass="top-2 right-2"
                />
            </div>
            <Overlay />
        </>
    );
};
