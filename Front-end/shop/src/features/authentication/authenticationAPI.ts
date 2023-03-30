import axios from "axios";
import { loginURL, registerURL } from "../../endpoints/endpoints";
import { Login, Register } from "../../models/Authentication";




const register = async (userData: Register) => {
    const response = await axios.post(registerURL, userData)
    console.log(response.data)
    return response.data
}


const login = async (userData: Login) => {
    const response = await axios.post(loginURL, userData)

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data))
    }

    return response.data
}

const logout = () =>
{
    localStorage.removeItem("token")
}

const authenticationService = {
    register,
    login,
    logout,
}

export default authenticationService
