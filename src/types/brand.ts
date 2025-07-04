export interface BrandDTO {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  category: string;
  subcategory:string
}

 export interface BrandStateDTO {
  brands: BrandDTO[];
  loading: boolean;
  error: string | null;
}

export interface BrandFormDTO {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  category: string;
  subcategory:string
}