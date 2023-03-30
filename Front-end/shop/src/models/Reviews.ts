export interface Review {
  id: string;
  product: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  picture?: string;
  time_created?: Date;
  }


  export interface ReviewState {
    single_review: Review
    reviews_product: Review[];
    reviews_user: Review[];
    allReviews: Review[];
  };