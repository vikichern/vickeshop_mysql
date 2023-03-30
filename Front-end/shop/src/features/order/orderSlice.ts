import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Order, OrderState } from "../../models/Order";
import { getOrders, getOrdersUser, postOrder } from "./orderAPI";

const initialState: OrderState = {
  single_order: {
    id: 0,
    user: 0,
    price: 0,
    amount: 0,
    shipping_address: {
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      postal_code: 0,
      country: "",
    },
    product: { id: "", picture: "", product_name: "", description: "" },
  },
  orders: [],
  orders_user: [],
  saveAddress: 0,
  saveTotal: 0,
};

export const postOrderAsync = createAsyncThunk(
  "order/postOrder",
  async (data: {
    orderData: any;
    orderDetails: { product: number; amount: number; price: number }[];
  }) => {
    const response = await postOrder(data.orderData, data.orderDetails);
    return response.data;
  }
);

export const getOrdersUserAsync = createAsyncThunk(
  "order/getOrdersUser",
  async () => {
    const response = await getOrdersUser();
    return response.data;
  }
);

export const getOrdersAsync = createAsyncThunk("order/getOrders", async () => {
  const response = await getOrders();
  return response.data;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.saveAddress = action.payload;
    },
    updateTotal: (state, action) => {
      state.saveTotal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderAsync.fulfilled, (state, action) => {
        state.orders = [...state.orders, action.payload];
      })
      .addCase(getOrdersUserAsync.fulfilled, (state, action) => {
        state.orders_user = action.payload;
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const { updateAddress, updateTotal } = orderSlice.actions;

export const selectOrdersUser = (state: RootState) => state.order.orders_user;
export const selectSingleOrder = (state: RootState) => state.order.single_order;
export const selectOrders = (state: RootState) => state.order.orders;
export const selectSavedAddress = (state: RootState) => state.order.saveAddress;
export const selectSavedTotal = (state: RootState) => state.order.saveTotal;

export default orderSlice.reducer;
