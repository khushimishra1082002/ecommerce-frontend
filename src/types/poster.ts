export interface PosterDTO {
  _id: string;
  image:  string;
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  location: string;
  displayOrder: number;
 startDate: string | null;  
 endDate: string | null; 
  active: boolean;
}
