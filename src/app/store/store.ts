import { configureStore } from "@reduxjs/toolkit"
import UserReducer from "../../entities/users/userSlice"
import ProductReducer from "../../entities/product/productSlice"
import AuthReducerRegister from "../../entities/auth/registration/registerSlice"
import AuthReducerLogin from "../../entities/auth/login/loginSlice"
import CartReducer from "../../entities/cart/cartSlice"
import ProductByIdReducer from "../../entities/product-by-id/productByIdSlice"
import CategoryReducer from "../../entities/category/categorySlice"
import catalogUiReducer from "../../entities/catalog/catalogSlice"
export const store = configureStore({
  reducer: {
    users: UserReducer,
    products: ProductReducer,
    productById:ProductByIdReducer,
    auth: AuthReducerRegister,
    login: AuthReducerLogin,
    cart: CartReducer,
    category:CategoryReducer,
    catalogUi: catalogUiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
