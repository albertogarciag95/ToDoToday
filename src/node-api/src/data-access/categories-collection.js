import mongoose from 'mongoose';

export default function makeCategoriesCollection({ makeDb }) {

  const CategoriesSchema = new mongoose.Schema({ name: String });
  const CategoriesModel = mongoose.model('Category', CategoriesSchema);

  return Object.freeze({
    getAllCategories
  })

  async function getAllCategories () {
    if(await makeDb()) {
      return await CategoriesModel.find({}).select('name -_id').sort('name');
    };
  }
}

