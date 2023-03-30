import { Product } from "./Product";

export interface Category {
    id: string;
    category_name: string;
    }
  
  
    export interface CategoryState {
      category_products: Product[]
      categories: Category[];
      category: Category;
    };