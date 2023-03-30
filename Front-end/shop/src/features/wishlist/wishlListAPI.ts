import axios from "axios";
import { productURL } from "../../endpoints/endpoints";
import { wishList } from "../../models/WishList";



export function getWishList()
{
  return new Promise<{ data: wishList[] }>((resolve) =>
    axios.get(productURL).then((res) => resolve({ data: res.data })));
}
