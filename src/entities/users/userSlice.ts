import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../app/api/api';

export interface User {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get<User[]>(import.meta.env.VITE_APP_USERPROFILE_GET_ALL_ENDPOINT);
            return data.data;
        } catch (error: unknown) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
                state.error = null
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
