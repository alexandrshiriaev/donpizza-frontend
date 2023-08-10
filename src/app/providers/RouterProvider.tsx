import { useRoutes } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HomePage from '~/pages/home';
import CartMenu from '~/widgets/cart-menu';
import ProductModal from '~/widgets/product-modal';

export function Router() {
    const route = useRoutes([
        {
            path: '/',
            element: <HomePage />,
            children: [
                { path: '/products/:id', element: <ProductModal /> },
                { path: '/cart', element: <CartMenu /> },
            ],
        },
    ]);
    return route;
}
