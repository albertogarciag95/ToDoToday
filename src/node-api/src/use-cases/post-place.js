import makePlace from '../entities/place';

export default function makePostPlaceUseCase({ db }) {

  return async function postPlaceUseCase(placeInfo, defaultCategoryName) {
    if(!placeInfo.category) {
      if(!defaultCategoryName) {
        throw Error('Error in postPlaceUseCase: no category given');
      }
      const category = await db.getCategoryByName(defaultCategoryName);
      placeInfo.category = category;
    }

    const place = makePlace(placeInfo);
    const exists = await db.findPlaceById(place)
    if (exists) {
      return exists
    }

    // return db.postPlace({
    //   title,
    //   description,
    //   category,
    //   latitude,
    //   longitude,
    //   price_per_person,
    //   dateStart,
    //   dateEnd
    // } = place)
    return place
  }
}
