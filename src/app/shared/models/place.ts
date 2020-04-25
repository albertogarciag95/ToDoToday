import { Category } from './category';

export interface Place {
  title: string;
  description: string;
  category: Category;
  latitude: number;
  longitude: number;
  dateStart: string;
  dateEnd: string;
  location: string;
  price_per_person: number;
}
