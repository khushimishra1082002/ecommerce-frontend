export interface PriceRangeDTO {
  _id: string;
  label: string;
  min: number;
  max?: number;
  category: string;
}

export interface PriceRangeStateDTO {
  priceRanges: PriceRangeDTO[];
  loading: boolean;
  error: string | null;
}

export interface PriceRangeFormDTO {
  label: string;
  min?: number;
  max?: number;
  category: string;
}
