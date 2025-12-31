import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/home";
import ProductsList from "../../pages/products/products";
import LoginPage from "../../pages/auth/login/LoginPage";
import RegistrationPage from "../../pages/auth/registration/Registration";
import CartPage from "../../pages/cart/cart";
import Layout from "../../widgets/layout/layout";
import ProductById from "../../pages/products/product-by-id/product-by-id";
import BrandPage from "../../pages/brand/brand";
import CategoryPage from "../../pages/category/category";
import SubCategoryPage from "../../pages/subCategory/subCategory";
import ColorPage from "../../pages/color/color";
import UsersPage from "../../pages/users/users";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "products",
                element: <ProductsList />
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path:"products/:id",
                element:<ProductById/>
            },
            {
                path:"brands",
                element:<BrandPage/>
            },
            {
                path:"categories",
                element:<CategoryPage/>
            },
            {
                path:"subCategories",
                element:<SubCategoryPage/>
            },
            {
                path:"colors",
                element:<ColorPage/>
            },
            {
                path:"users",
                element:<UsersPage/>
            }
        ]
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "registration",
        element: <RegistrationPage />
    }
])