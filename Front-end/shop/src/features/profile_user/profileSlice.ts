import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, patchProfile } from "./profileAPI";



export interface ProfileState {
    id: number;
    user: number;
    first_name: string;
    last_name: string;
    bio: string;
    location: string;
    picture: string;
}

const initialState: ProfileState = {
    id: 0,
    user: 0,
    bio: "",
    location: "",
    picture: "",
    first_name: "",
    last_name: ""
};

export const getProfileAsync = createAsyncThunk(
    'profile/getProfile',
    async () => {
        const response = await getProfile();
        return response
    }
)


export const patchProfileAsync = createAsyncThunk(
    'profile/patchProfile', 
    async (profileData: any) => {
        const response = await patchProfile(profileData); 
        return response; 
    } 
)
  


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:
    {

    },
    extraReducers: (builder) => {
        builder.addCase(getProfileAsync.fulfilled, (state, action) => {
            state.bio = action.payload.data.bio
            state.first_name = action.payload.data.first_name
            state.last_name = action.payload.data.last_name
            state.bio = action.payload.data.bio
            state.location = action.payload.data.location
            state.picture = action.payload.data.picture
        })
    }
})

export default profileSlice.reducer;


