import mongoose from 'mongoose';

export default function getDbModels() {

  const CategoriesSchema = new mongoose.Schema({
    name: String
  });

  const PlaceSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    latitude: Number,
    longitude: Number,
    price_per_person: Number
  });

  return Object.freeze({
    categoriesModel: mongoose.model('Category', CategoriesSchema),
    placesModel: mongoose.model('Place', PlaceSchema)
  })
}
