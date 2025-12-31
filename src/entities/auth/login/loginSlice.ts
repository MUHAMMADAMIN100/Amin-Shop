import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../app/api/api";
import type { LoginResponse } from "./model/types";



interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuth: boolean;
    success: string | null;
}
const initialState: AuthState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    isAuth: !!localStorage.getItem("token")
}

export const login = createAsyncThunk("auth/login", async (body, { rejectWithValue }) => {
    try {
        const { data } = await api.post<LoginResponse>(import.meta.env.VITE_APP_ACCOUNT_LOGIN_ENDPOINT, body)
        const token = data.data
        localStorage.setItem('token', token)
        return token

    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.errors?.[0] || 'Ошибка логина'
        );
    }
})

const authSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        logout(state) {
            state.token = null
            state.isAuth = false
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.success = action.payload || "Успешный вход"
                state.loading = false;
                state.token = action.payload;
                state.isAuth = true;
                localStorage.setItem("token", action.payload)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Ошибка"
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;