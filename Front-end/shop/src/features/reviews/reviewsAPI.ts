import axios from "axios";
import { reviewsURL } from "../../endpoints/endpoints";
import { Review } from "../../models/Reviews";



export function getReviewsProduct(id: number)
{
  return new Promise<{ data: Review[] }>((resolve) =>
    axios.get(`${reviewsURL}/reviews_product/${id}/`).then((res) => resolve({ data: res.data })));
}


export function getReviewsUser() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Review[] }>((resolve =>
      axios.get(`${reviewsURL}/reviews_user/`, config).then(res => resolve({ data: res.data }))))}



export function postReview(reviewData: Review) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Review }>((resolve) =>
  axios.post(`${reviewsURL}/review_post/`, reviewData, config).then(res => resolve({data: res.data}))
  )
}


export function patchReview(reviewData: any, id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Review }>((resolve) =>
    axios.put(`${reviewsURL}/review_update/${id}/`, reviewData, config).then((res) => resolve({ data: res.data }))
  );
}


export function deleteReview(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Review }>((resolve) =>
    axios.delete(`${reviewsURL}/review_delete/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}


export function deleteReviewUser(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Review }>((resolve) =>
    axios.delete(`${reviewsURL}/review_userdelete/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}
