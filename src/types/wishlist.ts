
export interface ProductDTO {
  _id: string;
  name: string;
  price: number;
  image: string[];
}


export interface WishlistProductDTO {
  productId: string; // Just the ID
  addedAt?: string;
}


export interface WishlistItem {
  _id?:string
  productId: ProductDTO; // full populated product
}


export interface WishlistDTO {
  _id?: string;
  userId: string;
  products: WishlistItem[]; 
  createdAt?: string;
  updatedAt?: string;
}


export interface WishlistStateDTO {
  wishlist: WishlistDTO | null;
  loading: boolean;
  error: string | null;
}
