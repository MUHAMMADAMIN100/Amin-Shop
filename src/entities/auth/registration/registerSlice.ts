import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RegisterRequest } from "./model/types";
import { registerUser } from "../../../features/auth/registration/register";

interface AuthState {
    loading: boolean;
    error: string | null,
    success: false
}

const initialState: AuthState = {
    loading: false,
    error: null,
    success: false,
}

export const register = createAsyncThunk("auth/register", async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
        return await registerUser(payload)
    } catch (error) {
        console.error(error);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;   