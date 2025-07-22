export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface RecentlyViewedItem {
  productId: string;
  viewedAt: string; // or Date
}

export interface UserDTO {
  _id?: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  image?: string;
  phoneNo?: string;
  address?: Address;
  recentlyViewed?: RecentlyViewedItem[];
  createdAt?: string; // or Date
  updatedAt?: string; // or Date
}
