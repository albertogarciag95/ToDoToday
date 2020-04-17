import getDbModels from './db-models';

export default function makeDbOperations({ makeDb }) {

  const { categoriesModel, placesModel } = getDbModels();

  return Object.freeze({
    getAllCategories,
    getCategoryByName,
    queryPlaces
  })

  async function getAllCategories() {
    if(await makeDb()) {
      var query = { isFoodType: false };
      return await categoriesModel.find(query).select('name -_id').sort('name');
    }
  }

  async function getCategoryByName({ name }) {
    if(await makeDb()) {
      return await categoriesModel.find({ name });
    }
  }

  async function queryPlaces({ category }) {
    if(await makeDb()) {
      const places = await placesModel.find({ category }).select('-_id').sort('name');
      return places;
    }
  }
}

