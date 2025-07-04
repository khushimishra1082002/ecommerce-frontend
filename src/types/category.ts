export interface CategoryDTO {
  _id: string;
  name: string;
  image: string;
}

export interface CategoryStateDTO {
  category: CategoryDTO[];
  loading: boolean;
  error: string | null;
}

export interface CategoryFormDTO {
  name: string;
  description?: string;
  image: File | null;
  isActive: boolean;
}
