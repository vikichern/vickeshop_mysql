import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Address, AddressState } from "../../models/Shipping";
import { deleteAddress, getAddresses, getSingleAddress, patchAddress, postAddress } from "./shippingAPI";



const initialState: AddressState = {
    addresses: [],
    single_address: { id: 0, first_name: '', last_name: '', address: '', city: '', state: "", postal_code: 0, country: ""}
  };

export const getAddressesAsync = createAsyncThunk(
    'shipping/getAddresses',
    async () => {
        const response = await getAddresses();
        return response.data;
    }
)

export const getSingleAddressAsync = createAsyncThunk(
    'shipping/getSingleAddress',
    async (id: string) => {
      const response = await getSingleAddress(id);
      return response.data;
    }
  );


  export const postAddressAsync = createAsyncThunk(
    'shipping/postAddress',
    async (shippingData: Address) => {
        const response = await postAddress(shippingData);
        return response.data;
    }
);


  export const deleteAddressAsync = createAsyncThunk(
    'shipping/deleteAddress',
    async (id: number) => {
    await deleteAddress(id);
    return { id };
    }
  );

  
  export const patchAddressAsync = createAsyncThunk(
    'shipping/patchAddress',
    async (data: {shippingData: any, id: number}) => {
    const response = await patchAddress(data.shippingData, data.id);
    return response;
    }
  )

export const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAddressesAsync.fulfilled, (state, action) => {
          state.addresses = action.payload
        })
        .addCase(getSingleAddressAsync.fulfilled, (state, action) => {
          state.single_address = action.payload
        })
        .addCase(patchAddressAsync.fulfilled, (state, action) => {
          state.single_address = { ...state.single_address, ...action.payload }
        })
        .addCase(deleteAddressAsync.fulfilled, (state, action) => {
          state.addresses = state.addresses.filter(address => address.id !== action.payload.id)
        })
        .addCase(postAddressAsync.fulfilled, (state, action) => {
          state.addresses = [...state.addresses, action.payload];
        })
        
    }
})




export const selectAddress = (state: RootState) => state.shipping.addresses;
export const selectSingleAddress = (state: RootState) => state.shipping.single_address;


export default shippingSlice.reducer;
