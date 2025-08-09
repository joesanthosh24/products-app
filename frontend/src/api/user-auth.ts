import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = "http://localhost:3000/auth";

export const userSignUp = createAsyncThunk(
    'user/signUp',
    async(
        { username, email, password, isAdmin }: 
        { username: string, email: string, password: string, isAdmin: boolean },
        {rejectWithValue}
    ) => {
        try {
            const res = await fetch(`${BASE_URL}/sign-up`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, isAdmin })
            })

            if (!res.ok) {
                const err = await res.json();

                return rejectWithValue(err.errorMsg);
            }

            const userData = await res.json();

            localStorage.setItem('authToken', userData.token);
            localStorage.setItem('authUser', JSON.stringify(userData));

            return userData;
        }
        catch (err) {
            return rejectWithValue((err as Error).message || "Server Error");
        }
    }
);

export const userLogin = createAsyncThunk(
    'user/login',
    async (
        { email, password }:
        { email: string, password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`${BASE_URL}/log-in`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!res.ok) {
                const err = await res.json();

                return rejectWithValue(err.errorMsg);
            }

            const userData = await res.json();

            localStorage.setItem('authToken', userData.token);
            localStorage.setItem('authUser', JSON.stringify(userData));

            return userData;
        }
        catch (err) {
            return rejectWithValue((err as Error).message || "Server Error");
        }
    }
)

// export const userLogout = createAsyncThunk(
//     'user/logout',
//     async (
//         { email, token }: { email: string, token: string },
//         { rejectWithValue }
//     ) => {
//         try {

//         }
//     }
// )
