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
