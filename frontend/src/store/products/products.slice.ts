import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { editProduct, fetchAllProducts, deleteProduct } from '../../api/products';

export interface ProductsState {
    products: Array<Product>,
    loading: boolean,
    error: string | null
};

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const { id, price, imageUrl } = action.payload;
                const index = state.products.findIndex(product => product._id === id);

                state.products[index] = { ...state.products[index], price, imageUrl };
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const { id } = action.payload;

                state.products = state.products.filter(product => product._id !== id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload
            })
    }
});

export default productsSlice.reducer;
