import axios from "axios";
import { productURL } from "../../endpoints/endpoints";
import { Cart } from "../../models/Cart";



export function getCart()
{
  return new Promise<{ data: Cart[] }>((resolve) =>
    axios.get(productURL).then((res) => resolve({ data: res.data })));
}
