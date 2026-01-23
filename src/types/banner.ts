export interface BannerDTO {
  _id: string;
  image: string;
  link?: string;
  location: string;
  displayOrder: number;
  startDate: string;  
  endDate?: string;   
  active: boolean;
}

export interface BannerStateDTO {
  banners: BannerDTO[];
  loading: boolean;
  error: string | null;
}
