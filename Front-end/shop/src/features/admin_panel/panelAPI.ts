import axios from "axios";
import { admin_panelURL } from "../../endpoints/endpoints";
import { Order } from "../../models/Order";
import Profile from "../../models/Profile";
import { Review } from "../../models/Reviews";
import { Address } from "../../models/Shipping";



export function getProfiles()
{
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Profile[] }>((resolve) =>
    axios.get(`${admin_panelURL}/user_details_profiles`, config).then((res) => resolve({ data: res.data })));
}


export function getSingleProfile(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Profile }>((resolve) =>
    axios.get(`${admin_panelURL}/user_details_single_profile/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}


export function patchUserProfile(profileData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Profile }>((resolve) =>
    axios.put(`${admin_panelURL}/user_details_update_profile/${id}/`, profileData, config).then((res) => resolve({ data: res.data }))
  );
}


export function patchUserAddress(addressData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Address }>((resolve) =>
    axios.put(`${admin_panelURL}/user_details_update_address/${id}/`, addressData, config).then((res) => resolve({ data: res.data }))
  );
}


export function getAllAddresses(id: string)
{
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Address[] }>((resolve) =>
    axios.get(`${admin_panelURL}/user_details_addresses/${id}/`, config).then((res) => resolve({ data: res.data })));
}


export function getAllReviews(id: string)
{
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Review[] }>((resolve) =>
    axios.get(`${admin_panelURL}/user_details_reviews/${id}/`, config).then((res) => resolve({ data: res.data })));
}


export function getSingleReview(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Review }>((resolve) =>
    axios.get(`${admin_panelURL}/user_details_single_review/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}


export function patchUserReview(reviewData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Review }>((resolve) =>
    axios.put(`${admin_panelURL}/user_details_update_review/${id}/`, reviewData, config).then((res) => resolve({ data: res.data }))
  );
}


export function getAllOrders(id: string)
{
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve) =>
    axios.get(`${admin_panelURL}/user_details_orders/${id}/`, config).then((res) => resolve({ data: res.data })));
}
