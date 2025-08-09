import { createSlice } from '@reduxjs/toolkit';

import type { User } from '../../types';
import { userLogin, userSignUp } from '../../api/user-auth';

export interface UserState {
    currentUser: User;
    isLoggedIn: boolean;
    authToken: string | null;
}

const initialState: UserState = {
    currentUser: {
        email: null,
        username: null,
        isAdmin: false
    },
    isLoggedIn: false,
    authToken: ""
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.currentUser = action.payload.user;
            state.isLoggedIn = true;
            state.authToken = action.payload.token
        },
        logout: (state) => {
            state.currentUser = { email: null, username: null, isAdmin: false }
            state.isLoggedIn = false;
            state.authToken = null;
            localStorage.removeItem("authToken");
            localStorage.removeItem('authUser');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isLoggedIn = true;
                state.authToken = localStorage.getItem("authToken");
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isLoggedIn = true;
                state.authToken = localStorage.getItem("authToken");
            })
    }
});

export const { setLoggedInUser, logout } = UserSlice.actions;
export default UserSlice.reducer;
