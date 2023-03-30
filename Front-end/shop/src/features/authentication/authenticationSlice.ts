import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";
import { Login, MyToken, Register } from "../../models/Authentication";
import authenticationService from "./authenticationAPI";
import jwt_decode from "jwt-decode";



export interface AuthenticationState
{
    userName: string | null,
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean,
    isLogged: boolean,
    access: string | null,
    refresh: string | null,
    is_staff: Boolean,
    message: string
}


const initialState: AuthenticationState =
{
    userName: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    isLogged: false,
    access: "",
    refresh: "",
    is_staff: false,
    message: ""
};

export const registerAsync = createAsyncThunk("authentication/register", async (user: Register, thunkAPI) =>
{
        try
        {
            return await authenticationService.register(user)
        }
        catch (error: any)
        {
            
            return thunkAPI.rejectWithValue(error.response.data.error)
        }
})



export const loginAsync = createAsyncThunk("authentication/login", async (user: Login) =>
{
        return await authenticationService.login(user)
})


export const logoutAsync = createAsyncThunk('auth/logout',
 async () =>
 {
    authenticationService.logout()
 })


export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        reset: (state) =>
        {
        state.isSuccess = false;
        state.isLoading = false;
        },

        LoggedOff: (state) =>
        {
            state.isLogged = false
        },
      
        LoggedOn: (state) => {
            state.isLogged = true
            state.userName = localStorage.getItem('userName') as string
        },

        staffCheck: (state) =>
        {
            if (localStorage.getItem("is_staff") === "true") {
              state.is_staff = true
            }
        },
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerAsync.rejected, (state, action) =>
        {
            state.isError = true
            state.message = action.payload as string
            console.log(state.message)
        })
        .addCase(registerAsync.pending, (state) =>
        {
            state.isLoading = true
        })
        .addCase(registerAsync.fulfilled, (state, action) =>
        {
            state.isLoading = false
            state.isSuccess = true
            state.userName = action.payload.data
        })


        .addCase(loginAsync.pending, (state) =>
        {
            state.isLoading = true
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            const decoded: MyToken = jwt_decode(action.payload.access)
        
            state.userName = decoded.username
            state.is_staff = decoded.is_staff
            localStorage.setItem('userName', decoded.username)
            localStorage.setItem('is_staff', JSON.stringify(decoded.is_staff))
            JSON.stringify(action.payload.access)
            state.access = action.payload.access
            state.isLoading = false;
            state.isSuccess = true;
            state.isLogged = true
        })
        
        

        .addCase(logoutAsync.fulfilled, (state) =>
        {
            state.userName = ""
            state.isLogged = false
            state.access = ""
        });
    }

})


export const selectUser = (state: RootState) => state.authentication.userName;
export const selectIsLogged = (state: RootState) => state.authentication.isLogged;
export const selectIsLoading = (state: RootState) => state.authentication.isLoading;
export const selectIsError = (state: RootState) => state.authentication.isError;

export const { reset, LoggedOff, LoggedOn } = authenticationSlice.actions;

export default authenticationSlice.reducer;
