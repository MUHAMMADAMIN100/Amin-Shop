import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "./model/types";
import { api } from "../../app/api/api";

export const fetchCategories=createAsyncThunk<Category[],void,{rejectValue:string}>(
    "category/fetchCategories",async(_,{rejectWithValue})=>{
        try {
            const {data}=await api.get<{data:Category[]}>(import.meta.env.VITE_APP_CATEGORY_GET_ALL_ENDPOINT)
            return data.data
        } catch (error:any) {
            return rejectWithValue("Ошибка загрузки категории")
        }
    }
)