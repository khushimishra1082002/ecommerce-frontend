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
  category: null;
  subcategory: null, // ✅
brand: null,       // ✅

  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  colors?:string[]
  gender?:string[]
  size?:string[]
}

export interface ProductStateDTO {
  products: ProductDTO[];
  loading: boolean;
  error: string | null;
}
export interface ProductFormDTO {
  name: string;
  slug?: string;
  description: string;
  image: File[];          // single/multiple image files
  price: number;
  stock: number;
  inStock: boolean;
  discount: number;
  isFeatured: boolean;
  category: string;
  subcategory: string;
  brand: string;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;

  // ✅ Add these three fields
  colors: string[];       // e.g. ['red', 'green']
  gender: string[];       // e.g. ['men', 'women']
  size: string[];         // e.g. ['xl', 'lg']
}
