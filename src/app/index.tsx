import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './providers';
import './index.css';

export { useAppDispatch, useAppSelector } from './providers/ReduxProvider';

export { appStore } from './providers/ReduxProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider />
    </React.StrictMode>
);
