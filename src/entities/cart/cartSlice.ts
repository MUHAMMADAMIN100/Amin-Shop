import {createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {CartState} from './model/types';
import { addToCart, clearCart, fetchCart, increaseProduct, reduceProduct, removeFromCart } from './thunks';

const initialState: CartState = {
  products: [],
  totalProducts: 0,
  totalPrice: 0,
  totalDiscountPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.productsInCart;
        state.totalProducts = action.payload.totalProducts;
        state.totalPrice = action.payload.totalPrice;
        state.totalDiscountPrice = action.payload.totalDiscountPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartState>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.totalPrice = action.payload.totalPrice;
        state.totalDiscountPrice = action.payload.totalDiscountPrice;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<CartState>) => {
        state.loading = false
        state.products = action.payload.products
        state.totalProducts = action.payload.totalProducts
        state.totalPrice = action.payload.totalPrice
        state.totalDiscountPrice = action.payload.totalDiscountPrice
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(increaseProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(increaseProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(reduceProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(reduceProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(reduceProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.products = [];
        state.totalProducts = 0;
        state.totalPrice = 0;
        state.totalDiscountPrice = 0;
      })
  },
});

export default cartSlice.reducer;
