import getDbModels from './db-models';

export default function makeDbOperations({ makeDb }) {

  const { categoriesModel, placesModel } = getDbModels();

  return Object.freeze({
    getAllCategories,
    queryPlaces
  })

  async function getAllCategories() {
    if(await makeDb()) {
      var query = { isFoodType: false };
      return await categoriesModel.find(query).select('name').sort('name');
    };
  }

  async function queryPlaces({ category }) {
    if(await makeDb()) {
      var query = { category: category._id };
      const places = await placesModel.find(query).sort('name');

      return places;
    };
  }
}

