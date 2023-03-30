export interface Address {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  postal_code?: number;
  country: string;
  user?: number;
}
      
      
export interface AddressState {
  addresses: Address[];
  single_address: Address;
};