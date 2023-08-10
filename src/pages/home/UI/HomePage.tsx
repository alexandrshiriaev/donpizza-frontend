import { Outlet } from 'react-router-dom';
import Navbar from '~/widgets/navbar';
import ProductsSection from '~/widgets/products-section';

import { saveCart } from '~/features/cart';
import { useEffect } from 'react';

export function HomePage() {
    const onUnload = () => {
        saveCart();
    };

    useEffect(() => {
        window.addEventListener('beforeunload', onUnload);

        return () => {
            window.removeEventListener('beforeunload', onUnload);
        };
    }, []);

    return (
        <div className="bg-secondary">
            <Outlet />
            <Navbar />
            <ProductsSection />
        </div>
    );
}
