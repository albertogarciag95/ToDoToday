import { Category } from './category';

export interface Place {
  name: string,
  description: string,
  category: Category,
  latitude: Number,
  longitude: Number,
  price_per_person: Number
}
