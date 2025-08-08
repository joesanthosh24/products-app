import { createSlice } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, editProduct, fetchAllProducts } from '../../api/products';

export interface ToastState {
    show: boolean;
    messageObj: {
        message: string | null;
        color: string | null;
    }
}

const initialState: ToastState = {
    show: false,
    messageObj: {
        message: null,
        color: null
    }
}

export const ToastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        hideToast: (state) => {
            state.show = false;
            state.messageObj = {
                message: null,
                color: null
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.show = true;
                state.messageObj = {
                    message: action.payload || "Failed to fetch products",
                    color: 'danger'
                }
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.show = true;
                state.messageObj = {
                    message: action.payload || "Failed to add product",
                    color: 'danger'
                }
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.show = true;
                state.messageObj = {
                    message: action.payload.message || "Successfully Added Product",
                    color: 'success'
                }
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.show = true;
                state.messageObj = {
                    message: action.payload || "Failed to edit product",
                    color: 'danger'
                }
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.show = true;
                state.messageObj = {
                    message: action.payload.message || "Successfully Edited Product",
                    color: 'success'
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.show = true;
                state.messageObj = {
                    message: action.payload || "Failed to delete product",
                    color: 'danger'
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.show = true;
                state.messageObj = {
                    message: action.payload.message || "Successfully Edited Product",
                    color: 'success'
                }
            })
    }
});

export const { hideToast } = ToastSlice.actions;
export default ToastSlice.reducer;