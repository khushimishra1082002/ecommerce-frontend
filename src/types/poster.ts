export interface PosterDTO {
  _id: string; 
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  location: string;
  displayOrder: number;
  startDate: string; 
  endDate?: string;  // Optional
  active: boolean;
}
