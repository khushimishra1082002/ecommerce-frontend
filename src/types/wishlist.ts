
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
  productId: ProductDTO; // full populated product
}


export interface WishlistDTO {
  _id?: string;
  userId: string;
  products: WishlistItem[]; 
  createdAt?: string;
  updatedAt?: string;
}
