import { createSlice } from "@reduxjs/toolkit";
import type { ProductByIdState } from "./model/types";
import { fetchProductById } from "./thunks";

const initialState: ProductByIdState = {
    product: null,
    loading: false,
    error: null,
}

const productByIdSlice = createSlice({
    name: "productById",
    initialState: initialState,
    reducers: {
        clearProductById(state) {
            state.product = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(fetchProductById.fulfilled,(state,acion)=>{
                state.loading=false;
                state.product=acion.payload
            })
            .addCase(fetchProductById.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload as string
            })
    }
})

export const {clearProductById}=productByIdSlice.actions
export default productByIdSlice.reducer
