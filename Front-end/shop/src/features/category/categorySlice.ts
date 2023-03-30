import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Category, CategoryState } from '../../models/Category';
import { deleteCategory, getCategory, getCategoryProducts, getSingleCategory, patchCategory, postCategory } from './categoryAPI';



const initialState: CategoryState = {
  category: { id: "", category_name: "" },
  categories: [{ id: "", category_name: "" }],
  category_products: [],
};



export const getCategoryAsync = createAsyncThunk(
  'category/getCategory',
  async () => {
    const response = await getCategory();
    return response.data;
  }
);


export const getCategoryProductsAsync = createAsyncThunk(
  'category/getCategoryProducts',
  async (id: string) => {
    const response = await getCategoryProducts(id);
    return response.data;
  }
);


export const postCategoryAsync = createAsyncThunk(
  'category/postCategory',
  async (categoryData: Category) => {
      const response = await postCategory(categoryData);
      return response.data;
  }
);


export const patchCategoryAsync = createAsyncThunk(
  'category/patchCategory',
  async (data: {categoryData: any, id: string}) => {
  const response = await patchCategory(data.categoryData, data.id);
  return response;
}
)


export const deleteCategoryAsync = createAsyncThunk(
  'category/deleteCategory',
  async (id: string) => {
  const response = await deleteCategory(id);
  return { id };
  }
  );


export const getSingleCategoryAsync = createAsyncThunk(
  'category/getSingleCategory',
  async (id: string) => {
    const response = await getSingleCategory(id);
    return response.data;
  }
);


export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAsync.fulfilled, (state, action) =>
      {
        state.categories = action.payload
      })
      .addCase(getCategoryProductsAsync.fulfilled, (state, action) =>
      {
        state.category_products = action.payload
      })
      .addCase(postCategoryAsync.fulfilled, (state, action) => {
        state.categories = [...state.categories, action.payload];
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload.id)
      })
      .addCase(getSingleCategoryAsync.fulfilled, (state, action) =>
      {
        state.category = action.payload;
      })
      .addCase(patchCategoryAsync.fulfilled, (state, action) => {
        state.category = { ...state.category, ...action.payload }
      })
  },
});



export const selectCategory = (state: RootState) => state.category.category;
export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategoryProducts = (state: RootState) => state.category.category_products;

export default categorySlice.reducer;
