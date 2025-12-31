import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductState } from './model/types.ts';
import { fetchProducts } from './thunks.ts';


const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    selectedCategoryId:null,
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategoryFilter:(state,action:PayloadAction<number|null>)=>{
            state.selectedCategoryId=action.payload
        },
        setSubCategoryFilter:(state,action)=>{
            state.selectedSubCategoryId=action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при загрузке продуктов';
            });
    },
});

export const {setCategoryFilter,setSubCategoryFilter}=productSlice.actions
export default productSlice.reducer;