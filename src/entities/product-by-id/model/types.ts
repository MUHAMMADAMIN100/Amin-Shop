import type { Product } from "../../product/model/types";

export interface ProductByIdState {
    product: Product | null;
    loading: boolean;
    error: string | null;
}