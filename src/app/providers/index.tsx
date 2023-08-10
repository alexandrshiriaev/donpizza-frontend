import { BrowserRouter } from 'react-router-dom';
import { Router } from './RouterProvider';
import { Redux } from './ReduxProvider';

import './FontProvider';

export function Provider() {
    return (
        <Redux>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </Redux>
    );
}
