import axios from "axios";
import { shippingURL } from "../../endpoints/endpoints";
import { Address } from "../../models/Shipping";



export function getAddresses() {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    return new Promise<{ data: Address[] }>((resolve =>
        axios.get(shippingURL + "/address", config).then(res => resolve({ data: res.data }))))}


export function getSingleAddress(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Address }>((resolve) =>
    axios.get(`${shippingURL}/shipping_get/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}


export function patchAddress(shippingData: any, id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Address }>((resolve) =>
    axios.put(`${shippingURL}/shipping_update/${id}/`, shippingData, config).then((res) => resolve({ data: res.data }))
  );
}


export function deleteAddress(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Address }>((resolve) =>
    axios.delete(`${shippingURL}/shipping_delete/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}


export function postAddress(shippingData: Address) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Address }>((resolve) =>
    axios.post(`${shippingURL}/address/`, shippingData, config).then((res) => resolve({ data: res.data }))
  );
}

