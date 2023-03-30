import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerAsync, reset } from "./authenticationSlice"
import { AiOutlineUser } from 'react-icons/ai'
import { Button } from 'react-bootstrap';



const Register = () => {
    const [formData, setFormData] = useState
    ({
        username: "",
        password: "",
        password2: "",
        email: ""
    })
    const { username, password, password2, email } = formData


    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {userName, isLoading, isSuccess} = useAppSelector((state) => state.authentication)

    useEffect(() =>
    {
        if (isSuccess)
        {
            navigate("/")
        }
        
        dispatch(reset())
    }, [isSuccess, navigate, dispatch])
    


    const onChange = (event: any) => {setFormData((PreviousState) => ({ ...PreviousState, [event.target.name]: event.target.value}))}

    const onSubmit = (event: any) =>
    {
        event.preventDefault()
        if (password !== password2)
        {
            toast.error("Passwords do not match.")
        }
        else
        {
            const userData =
            {
                username,
                email,
                password
            }
            dispatch(registerAsync(userData))
            .catch((error) => {
              toast.error(error.message);
            });
        }
    }

    return (
        <div className="container d-flex justify-content-center">
          <form className="form-group col-md-6" onSubmit={onSubmit}>
          <div style = {{height: "150px"}} />
          <h1 className="text-center">
              <AiOutlineUser /> Register
            </h1>
            <p className="text-center">Enter user details to create an account</p>
      
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
      
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={onChange}
              />
            </div><br/>
      
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Email address"
                onChange={onChange}
              />
            </div><br/>
      
            <div className="form-group text-center">
              <Button type="submit" className="btn btn-dark">
                Submit
              </Button>
            </div>
            <div style = {{height: "300px"}} />
          </form>
        </div>
      )
}



export default Register
