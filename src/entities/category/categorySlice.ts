import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category, CategoryState } from "./model/types";
import { fetchCategories } from "./thunks";

const initialState:CategoryState={
    categories:[],
    loading:false,
    error:null,
}
const categorySlice=createSlice({
    name:"category",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategories.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchCategories.fulfilled,(state,action:PayloadAction<Category[]>)=>{
            state.loading=false;
            state.categories=action.payload
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||"Ошибка загрузки категории"
        })
    }
})

export default categorySlice.reducer