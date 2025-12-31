import type { SubCategory } from "../../subCategory/model/types";

export interface Category {
    id: number;
    categoryName: string;
    categoryImage: string;
    subCategories: SubCategory[];
}

export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;

}