export interface SelectOption {
  label: string;
  value: string;
}
export interface subcategory {
  _id: string;
  name: string;
};

export interface brand {
  _id: string;
  name: string;
};

export interface ProductDTO {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string[];
  price: number;
  stock: number;
  inStock: boolean;
  discount: number;
  isFeatured: boolean;
  category: string;
  subcategory: subcategory;
  brand: brand;
  isActive: boolean;
  // metaTitle?: string;
  // metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  // System-generated
  rating?: number;
  reviewsCount?: number;
  views?: number;
  sold?: number;
  // Custom fields
  colors: string[];
  gender: (string | SelectOption)[];
  size: (string | SelectOption)[];

  // Optional backend fields
  attributes: {
    key: string;
    value: string;
  }[];

  taxPercentage?: number;
  taxRuppess?: number;
}

export interface ProductStateDTO {
  products: ProductDTO[];
  loading: boolean;
  error: string | null;
}

export interface ProductFormDTO {
  // _id: string;
  name: string;
  slug: string;
  description: string;
  image: string[];
  price: number;
  stock: number;
  inStock: boolean;
  discount: number;
  isFeatured: boolean;
  category: string;
  subcategory: string;
  brand: string;
  isActive: boolean;
  // metaTitle?: string;
  // metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  // System-managed (read-only in UI)
  rating?: number;
  reviewsCount?: number;
  views?: number;
  sold?: number;
  // Custom fields
  colors: string[];
  size: (string | SelectOption)[];
  gender: (string | SelectOption)[];
  // Optional backend fields
  attributes: {
    key: string;
    value: string;
  }[];

  taxPercentage?: number;
  taxRuppess?: number;
}
