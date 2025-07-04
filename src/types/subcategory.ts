export interface SubcategoryDTO {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  category: string;
  description:string
}

 export interface SubcategoryStateDTO {
  subcategories: SubcategoryDTO[];
  loading: boolean;
  error: string | null;
}


export interface SubcategoryFormDTO {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  category: string;
  description:string
}