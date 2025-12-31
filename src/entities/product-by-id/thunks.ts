import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../product/model/types";
import { api } from "../../app/api/api";

export const fetchProductById = createAsyncThunk<Product, number, { rejectValue: string }>
    ("productById/fetchProductById", async (id, { rejectWithValue }) => {
        try {
            const { data } = await api.get<{ data: Product }>(`${import.meta.env.VITE_APP_PRODUCT_GET_BY_ID_ENDPOINT}?id=${id}`)
            return data.data
        } catch (error: unknown) {
            return rejectWithValue("Ошибка загрузки продукта")
        }
    })