import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = "http://localhost:3000";

export const fetchAllProducts = createAsyncThunk(
    'products/fetchProducts', 
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/products`);

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err.errorMsg);
            }
            
            return await res.json();
        }
        catch(err) {
            return rejectWithValue((err as Error).message || "Server Error");
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (
        { name, price, imageUrl, description }: 
        { name: string, price: number, imageUrl: string, description: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`${BASE_URL}/products/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, price, imageUrl, description })
            })

            if (!res.ok) {
                const err = await res.json();

                return rejectWithValue(err.errorMsg);
            }

            return await res.json();
        }
        catch (err) {
            return rejectWithValue((err as Error).message || "Server Error");
        }
    }
)

export const editProduct = createAsyncThunk(
    'products/editProduct', 
    async (
        { id, price, imageUrl }: { id: string, price: number, imageUrl: string}, 
        { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/products/${id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({price, imageUrl})
            });

            if (!res.ok) {
                const err = await res.json();

                return rejectWithValue(err.errorMsg);
            }

            return await res.json();
        }
        catch(err) {
            return rejectWithValue((err as Error).message || "Server Error");
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/products/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err.errorMsg);
            }

            const data = await res.json();

            return { id, message: data.message };
        }
        catch (err) {
            return rejectWithValue((err as Error).message || "Server Error");
        }
    }
);
