export interface PriceRange {
  min: number | string;
  max: number | string;
}

export interface PriceRange {
  min: number | string;
  max: number | string;
}

export interface FiltersState {
  categories: string;
  subcategories: string[];
  gender: string[];
  brands: string[];
  priceRange: PriceRange;
  size: string[]; 
  colors: string[];
  inStock: boolean | null;
  discount: string[];

}

