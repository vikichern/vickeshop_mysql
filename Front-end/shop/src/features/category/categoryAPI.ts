import axios from "axios";
import { categoryURL } from "../../endpoints/endpoints";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";



export function getCategory() {
  return new Promise<{ data: Category[] }>((resolve) =>
    axios.get(`${categoryURL}/get_categories/`).then((res) => resolve({ data: res.data }))
  );
}


export function getCategoryProducts(id: string) {
  return new Promise<{ data: Product[] }>((resolve) =>
    axios.get(`${categoryURL}/category_products/${id}/`).then((res) => resolve({ data: res.data }))
  );
}


export function postCategory(categoryData: Category) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Category }>((resolve) =>
    axios.post(`${categoryURL}/categories/`, categoryData, config).then((res) => resolve({ data: res.data }))
  );
}


export function deleteCategory(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Category }>((resolve) =>
    axios.delete(`${categoryURL}/categories/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}


export function getSingleCategory(id: string) {
  return new Promise<{ data: Category }>((resolve) =>
    axios.get(`${categoryURL}/single_category/${id}/`).then((res) => resolve({ data: res.data }))
  );
}


export function patchCategory(categoryData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Category }>((resolve) =>
    axios.put(`${categoryURL}/categories/${id}/`, categoryData, config).then((res) => resolve({ data: res.data }))
  );
}
