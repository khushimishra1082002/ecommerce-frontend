export interface BannerDTO {
  _id: string;
  image: string;
  link?: string;
  location: string;
  displayOrder: number;
  startDate: string;  // or Date
  endDate?: string;   // or Date
  active: boolean;
}

export interface BannerStateDTO {
  banners: BannerDTO[];
  loading: boolean;
  error: string | null;
}
