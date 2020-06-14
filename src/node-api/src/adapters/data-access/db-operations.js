import getDbModels from './db-models';

export default function makeDbOperations() {

  const { categoriesModel, placesModel, userModel } = getDbModels();

  return Object.freeze({
    getAllCategories,
    getAllPlaces,
    getCategoryByName,
    queryPlaces,
    findPlaceByTitle,
    postPlace,
    removePlace,
    findUser,
    postUser,
    removeUser
  })

  async function getAllCategories() {
    return await categoriesModel.find().select('-_id').sort('name');
  }

  async function getAllPlaces() {
    return await placesModel.find().select('-_id');
  }

  async function getCategoryByName(name) {
    return await categoriesModel.find({ name });
  }

  async function queryPlaces({ category, price, date }) {
    let query = { category };

    if(price) {
      const { initRange, finalRange } = price;
      query.price_per_person = { $gte: initRange, $lte: finalRange };
    }

    if(date) {
      query = Object.assign(query,
        { $or: [
          { $and: [{ dateStart: { $lte: new Date(date) } }, { dateEnd: { $gte: new Date(date) } }] },
          { $and: [{ dateStart: undefined }, { dateEnd: undefined }] }
        ]},
      );
    }

    const places = await placesModel.find(query).select('-_id').sort('name');

    return places;
  }

  async function findPlaceByTitle(title) {
    const place = await placesModel.find({ title });
    return place;
  }

  async function postPlace(place) {
    const newPlace = new placesModel(place);
    return newPlace.save();
  }

  async function removePlace(place) {
    return await placesModel.deleteOne(place);
  }

  async function findUser(email, userName) {
    return await userModel.find({ $or: [ { email }, { userName} ] });
  }

  async function postUser(user) {
    const newUser = new userModel(user);
    return newUser.save();
  }

  async function removeUser(user) {
    return await userModel.deleteOne(user);
  }
}

