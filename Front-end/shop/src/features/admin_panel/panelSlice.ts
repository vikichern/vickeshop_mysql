import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PanelState } from '../../models/AdminPanel';
import { getAllAddresses, getAllOrders, getAllReviews, getProfiles, getSingleProfile, getSingleReview, patchUserAddress, patchUserProfile, patchUserReview } from './panelAPI';



const initialState: PanelState = {
  profiles: [],
  single_profile: {id: 0,
                    user: 0,
                    bio: "",
                    location: "",
                    picture: "",
                    first_name: "",
                    last_name: ""},
  addresses: [],
  single_address: { id: 0,
                    first_name: '',
                    last_name: '', address: '',
                    city: '',
                    state: "",
                    postal_code: 0,
                    country: ""},
  reviews: [],
  single_review: { id: "",
                  product: "",
                  user: "",
                  name: "",
                  rating: 0,
                  comment: "",
                  picture: "" },
  orders: []
};


export const getProfilesAsync = createAsyncThunk(
  'panel/getProfiles',
  async () => {
    const response = await getProfiles();
    return response.data;
  }
);

export const getSingleProfileAsync = createAsyncThunk(
  'panel/getSingleProfile',
  async (id: string) => {
    const response = await getSingleProfile(id);
    return response.data;
  }
);


export const patchUserProfileAsync = createAsyncThunk(
  'panel/patchUserProfile',
  async (data: {profileData: any, id: string}) => {
  const response = await patchUserProfile(data.profileData, data.id);
  return response;
  }
)


export const patchUserAddressAsync = createAsyncThunk(
  'panel/patchUserAddress',
  async (data: {addressData: any, id: string}) => {
  const response = await patchUserAddress(data.addressData, data.id);
  return response;
  }
)


export const getAllAddressesAsync = createAsyncThunk(
  'panel/getAllAddresses',
  async (id: string) => {
    const response = await getAllAddresses(id);
    return response.data;
  }
);


export const getAllReviewsAsync = createAsyncThunk(
  'panel/getAllReviews',
  async (id: string) => {
    const response = await getAllReviews(id);
    return response.data;
  }
);


export const getSingleReviewAsync = createAsyncThunk(
  'panel/getSingleReview',
  async (id: string) => {
    const response = await getSingleReview(id);
    return response.data;
  }
);


export const patchUserReviewAsync = createAsyncThunk(
  'panel/patchUserReview',
  async (data: {reviewData: any, id: string}) => {
  const response = await patchUserReview(data.reviewData, data.id);
  return response;
  }
)



export const getAllOrdersAsync = createAsyncThunk(
  'panel/getAllOrders',
  async (id: string) => {
    const response = await getAllOrders(id);
    return response.data;
  }
);



export const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfilesAsync.fulfilled, (state, action) =>
      {
        state.profiles = action.payload
      })
      .addCase(getSingleProfileAsync.fulfilled, (state, action) => {
        state.single_profile = action.payload
      })
      .addCase(patchUserProfileAsync.fulfilled, (state, action) => {
        state.single_profile = { ...state.single_profile, ...action.payload }
      })
      .addCase(getAllAddressesAsync.fulfilled, (state, action) =>
      {
        state.addresses = action.payload
      })
      .addCase(getAllReviewsAsync.fulfilled, (state, action) =>
      {
        state.reviews = action.payload
      })
      .addCase(getSingleReviewAsync.fulfilled, (state, action) => {
        state.single_review = action.payload
      })
      .addCase(patchUserReviewAsync.fulfilled, (state, action) => {
        state.single_review = { ...state.single_review, ...action.payload }
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) =>
      {
        state.orders = action.payload
      })
  },
});



export const selectProfiles = (state: RootState) => state.panel.profiles;
export const selectSingleProfile = (state: RootState) => state.panel.single_profile;
export const selectAddresses = (state: RootState) => state.panel.addresses;
export const selectReviews = (state: RootState) => state.panel.reviews;
export const selectSingleUserReview = (state: RootState) => state.panel.single_review;
export const selectOrders = (state: RootState) => state.panel.orders;


export default panelSlice.reducer;
