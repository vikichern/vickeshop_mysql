import axios from "axios";
import { productURL } from "../../endpoints/endpoints";
import { Product } from "../../models/Product";



export function getProducts()
{
  return new Promise<{ data: Product[] }>((resolve) =>
    axios.get(`${productURL}/products`).then((res) => resolve({ data: res.data })));
}


export function searchProducts(searchQuery: string)
{
  return new Promise<{ data: Product[] }>((resolve) =>
    axios.get(`${productURL}/search_product`, { params: { product_name: searchQuery }}).then((res) => resolve({ data: res.data })));
}


export function postProduct(productData: Product) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Product }>((resolve) =>
    axios.post(`${productURL}/product_post/`, productData, config).then((res) => resolve({ data: res.data }))
  );
}


export function patchProduct(productData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Product }>((resolve) =>
    axios.put(`${productURL}/product_patch/${id}/`, productData, config).then((res) => resolve({ data: res.data }))
  );
}


export function getSingleProduct(id: string) {
  return new Promise<{ data: Product }>((resolve) =>
    axios.get(`${productURL}/single_product/${id}/`).then((res) => resolve({ data: res.data }))
  );
}


export function deleteProduct(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Product }>((resolve) =>
    axios.delete(`${productURL}/product_delete/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}
