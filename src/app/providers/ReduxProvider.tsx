import {
    Provider as ReduxProvider,
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '../rootStore';

interface ReduxProviderProps {
    children?: React.ReactNode;
}

function makeStore() {
    const store = configureStore({
        reducer: rootReducer as unknown as typeof rootReducer,
    });

    return store;
}

export const appStore = makeStore();

export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof appStore.getState>
> = useSelector;

export function Redux({ children }: ReduxProviderProps) {
    return <ReduxProvider store={appStore}>{children}</ReduxProvider>;
}
