import { Category } from './category';

export interface Place {
  name: string;
  description: string;
  category: Category;
  latitude: number;
  longitude: number;
  price_per_person: number;
}
