import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import panelReducer from '../features/admin_panel/panelSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import cartReducer from '../features/cart/cartSlice';
import categoryReducer from '../features/category/categorySlice';
import orderReducer from '../features/order/orderSlice';
import productReducer from '../features/product/productSlice';
import profileReducer from '../features/profile_user/profileSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import shippingReducer from '../features/shipping/shippingSlice';
import wishListReducer from '../features/wishlist/wishListSlice';




export const store = configureStore({
  reducer: {
    product: productReducer,
    authentication: authenticationReducer,
    profile: profileReducer,
    shop: cartReducer,
    shipping: shippingReducer,
    category: categoryReducer,
    wishlist: wishListReducer,
    reviews: reviewsReducer,
    order: orderReducer,
    panel: panelReducer
  },
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
