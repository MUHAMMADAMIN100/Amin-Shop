export interface Product {
  id: number;
  productName: string;
  image: string;
  color: string;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  quantity: number;
  productInMyCart: boolean;
  categoryId: number;
  categoryName: string;
}
export interface ProductState {
  products: Product[],
  loading: boolean,
  error: string | null,
  selectedCategoryId: number | null;
  selectedSubCategoryId: number | null;
}