import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { editProduct, fetchAllProducts, deleteProduct } from '../../api/products';

export interface ProductsState {
    products: Array<Product>,
    loading: boolean
};

const initialState: ProductsState = {
    products: [],
    loading: false
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const { id, price, imageUrl } = action.payload;
                const index = state.products.findIndex(product => product._id === id);

                state.products[index] = { ...state.products[index], price, imageUrl };
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const { id } = action.payload;

                state.products = state.products.filter(product => product._id !== id);
            })
    }
});

export default productsSlice.reducer;
