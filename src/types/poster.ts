export interface PosterDTO {
  _id: string;
  image: File | string;
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  location: string;
  displayOrder: number;
  startDate: string;
  endDate?: string;
  active: boolean;
}
