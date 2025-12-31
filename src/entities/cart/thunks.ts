import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../app/api/api";
import type { CartResponse } from "./model/types";

export const addToCart = createAsyncThunk<
  void,
  number,
  { rejectValue: string; dispatch: any }
>(
  "cart/addToCart",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(
        `${import.meta.env.VITE_APP_CART_ADD_PRODUCT_ENDPOINT}?id=${productId}`
      );
      await dispatch(fetchCart());
      return;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Ошибка добавления в корзину"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId: number, { rejectWithValue,dispatch }) => {
  try {
     await api.delete(`${import.meta.env.VITE_APP_CART_DELETE_PRODUCT_ENDPOINT}?id=${productId}`)
    dispatch(fetchCart())
  } catch (error) {
    return rejectWithValue(error.response?.data?.errors?.[0] || "Ошибка при удалении продукта");
  }
}
)

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<CartResponse>(import.meta.env.VITE_APP_CART_GET_PRODUCTS_ENDPOINT);
      return response.data.data[0];
    } catch (e) {
      return rejectWithValue('Ошибка загрузки корзины');
    }
  }
);

export const increaseProduct = createAsyncThunk<void, number, { rejectValue: string; dispatch: any }>(
  'cart/increaseProduct',
  async (cartItemId, { rejectWithValue, dispatch }) => {
    try {
      await api.put(
        `${import.meta.env.VITE_APP_CART_INCREASE_PRODUCT_ENDPOINT}?id=${cartItemId}`
      );
      await dispatch(fetchCart());
    } catch (e: any) {
      return rejectWithValue('Ошибка увеличения количества');
    }
  }
);

export const reduceProduct = createAsyncThunk<void, number, { rejectValue: string; dispatch: any }>('cart/reduceProduct', 
  async (productId: number, { rejectWithValue,dispatch})=> {
  try {
    await api.put(
      `${import.meta.env.VITE_APP_CART_REDUCE_PRODUCT_ENDPOINT}?id=${productId}`
    );
    await dispatch(fetchCart())
  } catch {
    return rejectWithValue('Ошибка уменьшения количества');
  }
}
);

export const clearCart = createAsyncThunk<void, number, { rejectValue: string; dispatch: any }>('cart/clearCart', async (_, { rejectWithValue ,dispatch}) => {
  try {
    const { data } = await api.delete(
      import.meta.env.VITE_APP_CART_CLEAR_ENDPOINT
    );
    return data.data;
  } catch {
    return rejectWithValue('Ошибка очистки корзины');
  }
}
);