export interface CartProduct {
    id: number;
    productId: number;
    productName: string;
    image: string;
    price: number;
    discountPrice: number;
    quantity: number;
}

export interface CartData {
    productsInCart: CartProduct[];
    totalProducts: number;
    totalPrice: number;
    totalDiscountPrice: number;
}

export interface CartResponse {
    data: CartData[];
    errors: string[];
    statusCode: number;
}

export interface CartTableProps {
    items: CartProduct[];
    loading: boolean;
}

export interface CartTableProps {
    items: CartProduct[];
    loading: boolean;
}

export interface CartState {
  products: CartProduct[];
  totalProducts: number;
  totalPrice: number;
  totalDiscountPrice: number;
  loading: boolean;
  error: string | null;
}