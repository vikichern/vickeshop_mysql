import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ProductState } from '../../models/Product';
import { deleteProduct, getProducts, getSingleProduct, patchProduct, postProduct, searchProducts } from './productAPI';



const initialState: ProductState = {
  products: [],
  single_product: { id: 0, category: 0, product_name: '', description: '', price: 0, picture: ""},
  search_product: ""
};



export const getProductsAsync = createAsyncThunk(
  'product/getProducts',
  async () => {
    const response = await getProducts();
    return response.data;
  }
);


export const searchProductsAsync = createAsyncThunk(
  'product/searchProducts',
  async (data: {searchQuery: string}) => {
    const response = await searchProducts(data.searchQuery);
    return response.data;
  }
);


export const getSingleProductAsync = createAsyncThunk(
  'product/getSingleProduct',
  async (id: string) => {
    const response = await getSingleProduct(id);
    return response.data;
  }
);


export const postProductAsync = createAsyncThunk(
  'product/postProduct',
  async (productData: any) => {
  const response = await postProduct(productData);
  return response.data;
  }
);


export const deleteProductAsync = createAsyncThunk(
  'product/deleteProduct',
  async (id: number) => { await deleteProduct(id);
  return { id };
  }
);


  export const patchProductAsync = createAsyncThunk(
    'product/patchProduct',
    async (data: {productData: any, id: string}) => {
    const response = await patchProduct(data.productData, data.id);
    return response;
  }
)


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateSearchProduct: (state, action) => {
      state.search_product = action.payload
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.fulfilled, (state, action) =>
      {
        state.products = action.payload
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) =>
      {
        state.products = action.payload
      })
      .addCase(getSingleProductAsync.fulfilled, (state, action) =>
      {
        state.single_product = action.payload
      })
      .addCase(postProductAsync.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload];
      })
      .addCase(patchProductAsync.fulfilled, (state, action) => {
        state.single_product = { ...state.single_product, ...action.payload }
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload.id)
      })
  },
});



export const { updateSearchProduct } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;
export const selectSingleProduct = (state: RootState) => state.product.single_product;
export const selectSearchProduct = (state: RootState) => state.product.search_product;
export const selectTotalProducts = (state: RootState) => state.product.products.length;


export default productSlice.reducer;
