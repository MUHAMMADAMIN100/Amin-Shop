import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../app/api/api";
import type { Product } from "./model/types";

export const fetchProducts = createAsyncThunk<
    Product[],
    { categoryId?: number | null; subCategoryId?: number | null } | undefined
>(
    'products/fetchProducts',
    async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.categoryId) {
            params.append('categoryId', String(filters.categoryId));
        }

        if (filters.subCategoryId) {
            params.append('subCategoryId', String(filters.subCategoryId));
        }

        const { data } = await api.get(
            `${import.meta.env.VITE_APP_PRODUCT_GET_ALL_ENDPOINT}?${params.toString()}`
        );
        return data.data.products;
    }
);
