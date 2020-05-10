import getDbModels from './db-models';

export default function makeDbOperations({ makeDb }) {

  const { categoriesModel, placesModel } = getDbModels();

  return Object.freeze({
    getAllCategories,
    getAllPlaces,
    getCategoryByName,
    queryPlaces,
    findPlaceByTitle,
    postPlace,
    removePlace
  })

  async function getAllCategories() {
    await makeDb();
    return await categoriesModel.find().select('-_id').sort('name');
  }

  async function getAllPlaces() {
    await makeDb();
    return await placesModel.find().select('-_id');
  }

  async function getCategoryByName(name) {
    await makeDb();
    return await categoriesModel.find({ name });
  }

  async function queryPlaces(query) {
    await makeDb();
    const { category } = query;

    const places = await placesModel.find({ category }).select('-_id').sort('name');
    return places;
  }

  async function findPlaceByTitle(title) {
    await makeDb();
    const place = await placesModel.find({ title });
    return place;
  }

  async function postPlace(place) {
    await makeDb();

    const newPlace = new placesModel(place);
    return newPlace.save();
  }

  async function removePlace(place) {
    await makeDb();

    return await placesModel.deleteOne(place);
  }
}

