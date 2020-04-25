import getDbModels from './db-models';

export default function makeDbOperations({ makeDb }) {

  const { categoriesModel, placesModel } = getDbModels();

  return Object.freeze({
    getAllCategories,
    getCategoryByName,
    queryPlaces,
    findPlaceByName,
    postPlace
  })

  async function getAllCategories() {
    if(await makeDb()) {
      var query = { isFoodType: false };
      return await categoriesModel.find(query).select('name -_id').sort('name');
    }
  }

  async function getCategoryByName(name) {
    if(await makeDb()) {
      return await categoriesModel.find({ name });
    }
  }

  async function queryPlaces(query) {
    if(await makeDb()) {
      const { category } = query;

      const places = await placesModel.find({ category }).select('-_id').sort('name');
      return places;
    }
  }

  async function findPlaceByName({ name }) {
    if(await makeDb()) {
      const place = await placesModel.find({ name });
      return place;
    }
  }

  async function postPlace(place) {
    if(await makeDb()) {

      const newPlace = new placesModel(place);
      return newPlace.save();
    }
  }
}

