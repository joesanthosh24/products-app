import { configureStore } from '@reduxjs/toolkit';
import productsReducer from "./products/products.slice";
import toastReducer from './toast/toasts.slice';
import userReducer from './user/user.slice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        toaster: toastReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
