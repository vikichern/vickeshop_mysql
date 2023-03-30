import { Order } from "./Order";
import Profile from "./Profile";
import { Review } from "./Reviews";
import { Address } from "./Shipping";



export interface PanelState {
    profiles: Profile[]
    single_profile: Profile
    addresses: Address[]
    single_address: Address
    reviews: Review[]
    single_review: Review
    orders: Order[]
  };