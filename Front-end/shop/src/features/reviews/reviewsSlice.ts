import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ReviewState } from '../../models/Reviews';
import { getReviewsProduct, postReview, deleteReview, getReviewsUser, deleteReviewUser, patchReview } from './reviewsAPI';




const initialState: ReviewState = {
  single_review: { id: "", product: "", user: "", name: "", rating: 0, comment: "", picture: "" },
  reviews_product: [],
  reviews_user: [],
  allReviews: []
};



export const getReviewsProductAsync = createAsyncThunk(
  'reviews/getReviewsProduct',
  async (id: number) => {
    const response = await getReviewsProduct(id);
    return response.data;
  }
)


export const getReviewsUserAsync = createAsyncThunk(
  'reviews/getReviewsUser',
  async () => {
    const response = await getReviewsUser();
    return response.data;
  }
)


export const patchReviewAsync = createAsyncThunk(
  'reviews/patchReview',
  async (data: {reviewData: any, id: number}) => {
  const response = await patchReview(data.reviewData, data.id);
  return response;
  }
)


export const postReviewAsync = createAsyncThunk(
  'reviews/postReview', 
  async (reviewData: any) => {
      const response = await postReview(reviewData);
      return response.data
  }
)

export const deleteReviewAsync = createAsyncThunk(
  'reviews/deleteReview',
  async (id: string) => { await deleteReview(id);
  return { id };
  }
);


export const deleteReviewUserAsync = createAsyncThunk(
  'reviews/deleteReviewUser',
  async (id: string) => { await deleteReviewUser(id);
  return { id };
  }
);



export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsProductAsync.fulfilled, (state, action) =>
      {
        state.reviews_product = action.payload
      })
      .addCase(getReviewsUserAsync.fulfilled, (state, action) =>
      {
        state.reviews_user = action.payload
      })
      .addCase(patchReviewAsync.fulfilled, (state, action) => {
        state.single_review = { ...state.single_review, ...action.payload }
      })
      .addCase(postReviewAsync.fulfilled, (state, action) => {
        state.allReviews = [...state.allReviews, action.payload];
        console.log(action.payload)
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.allReviews = state.allReviews.filter(review => review.id !== action.payload.id)
        window.location.reload();
      })
      .addCase(deleteReviewUserAsync.fulfilled, (state, action) => {
        state.allReviews = state.allReviews.filter(review => review.id !== action.payload.id)
        window.location.reload();
      })
  },
});



export const selectProductReviews = (state: RootState) => state.reviews.reviews_product;
export const selectUserReviews = (state: RootState) => state.reviews.reviews_user;
export const selectSingleReview = (state: RootState) => state.reviews.single_review;

export default reviewsSlice.reducer;
