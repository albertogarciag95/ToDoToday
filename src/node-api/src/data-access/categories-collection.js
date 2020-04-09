import mongoose from 'mongoose';

export default function categoriesCollection ({ makeDb }) {

  const CategoriesSchema = new mongoose.Schema({ name: String });
  const CategoriesModel = mongoose.model('Category', CategoriesSchema);

  return Object.freeze({
    getAllCategories
  })

  function getAllCategories () {
    makeDb();
    return CategoriesModel.find();
  }
}

