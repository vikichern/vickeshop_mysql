export interface Product {
  id?: number;
  category: number;
  product_name: string;
  description: string;
  price: number;
  picture: string;
  time_created?: Date;
  }


  export interface ProductState {
    products: Product[];
    single_product: Product;
    search_product: string
  };