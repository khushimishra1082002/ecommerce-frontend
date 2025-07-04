export interface DiscountOptionDTO {
  _id: string;
  categoryId: string;
  options: {
    label: string;
    value: number;
  }[];
}

export interface DiscountOptionsStateDTO {
  discountOptions: DiscountOptionDTO[];
  loading: boolean;
  error: string | null;
}

export interface DiscountRangeFormDTO {
  _id: string;
  categoryId: string;
  options: {
    label: string;
    value: number;
  }[];
}
