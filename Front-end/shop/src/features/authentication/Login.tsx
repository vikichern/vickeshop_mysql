import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from 'react-router-dom';
import { loginAsync, reset } from "./authenticationSlice"
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

      const { username, password } = formData;

      const navigate = useNavigate();
      const dispatch = useAppDispatch();

      const { userName, isSuccess } = useAppSelector(
        (state) => state.authentication
      );


      useEffect(() =>
      {
          if (isSuccess)
          {
              navigate("/")
          }

          dispatch(reset())

      }, [userName, isSuccess, navigate, dispatch])


      const onChange = (e:any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
      };

      const onSubmit = (e: any) => {
        e.preventDefault();
      
        const userData = {
          username,
          password,
        };
        dispatch(loginAsync(userData))
  };

  return (
    <div className="container d-flex justify-content-center">
      <ToastContainer />

  <form className="form-group col-md-6" onSubmit={onSubmit}>
  <div style = {{height: "150px"}} />
  <h1 className="text-center">
      <FaSignInAlt /> Login
    </h1>
    <p className="text-center">Enter your user details</p>

    <div className="form-group">
      <input
        type="text"
        className="form-control"
        id="username"
        name="username"
        value={username}
        placeholder="Enter your name"
        onChange={onChange}
      />
    </div><br/>

    <div className="form-group">
      <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={onChange}
      />
    </div><br/>

    <div className="form-group text-center">
      <Button type="submit" className="btn btn-dark">
        Submit
      </Button><br/><br/>
      <Button style = {{width: "50%"}} href = '/register' className="btn btn-warning">
        Register
      </Button>
    </div>
    <div style = {{height: "300px"}} />
  </form>
</div>

  )
}

export default Login