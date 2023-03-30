import axios from "axios";
import { profile_userURL } from "../../endpoints/endpoints";
import Profile from "../../models/Profile";



export function getProfile() {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    return new Promise<{ data: Profile }>((resolve =>
        axios.get(profile_userURL + "/profile", config).then(res => resolve({ data: res.data }))))}

        

export function patchProfile(profileData: any) {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }
    return new Promise<{ data: Profile }>((resolve) => 
    axios.put(profile_userURL + '/profile_update', profileData, config).then(res => resolve({ data: res.data })))}


