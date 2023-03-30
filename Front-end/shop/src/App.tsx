import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MyFooter from './features/navigators/MyFooter';
import MyNavbar from './features/navigators/MyNavbar';
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from './app/hooks';
import { LoggedOff, LoggedOn } from './features/authentication/authenticationSlice';
import CategoryNavbar from './features/navigators/CategoryNavbar';
import { getProductsAsync } from './features/product/productSlice';
import { initCart } from './features/cart/cartSlice';


function App() {
    const dispatch = useAppDispatch()

    const myToken = JSON.parse(localStorage.getItem('token') as string)
    const accessToken = myToken?.access
    const isStaff = myToken?.is_staff
  
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('token', JSON.stringify({ access: accessToken, is_staff: isStaff }))
      dispatch(LoggedOn())
    } if (accessToken == null) {
      localStorage.removeItem('is_staff')
      localStorage.removeItem('token')
      dispatch(LoggedOff())
    }
  }, [accessToken, isStaff])

  useEffect(() =>{
    dispatch(getProductsAsync())
    dispatch(initCart());
  }, [dispatch])

  
  
  
  return (
    <div>
      <MyNavbar />
      <CategoryNavbar />
      <Outlet />

      <MyFooter />

      <ToastContainer />
    </div>
  );
}

export default App;
