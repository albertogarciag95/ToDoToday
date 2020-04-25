import makePlace from '../entities/place';

export default function makePostPlaceUseCase({ db }) {

  return async function postPlaceUseCase(placeInfo, defaultCategoryName) {

    if(!placeInfo.category) {
      if(!defaultCategoryName) {
        throw Error('Error in postPlaceUseCase: no category given');
      }
      const category = await db.getCategoryByName(defaultCategoryName);
      placeInfo.category = category[0]._id;
    }

    const place = makePlace(placeInfo);
    const exists = await db.findPlaceByName(place);
    if (exists.length !== 0) {
      return exists;
    }

    return db.postPlace({
      title: place.getTitle(),
      description: place.getDescription(),
      category: place.getCategory(),
      latitude: place.getLatitude(),
      longitude: place.getLongitude(),
      location: place.getLocation(),
      price_per_person: place.getPrice(),
      dateStart: place.getDateStart(),
      dateEnd: place.getDateEnd()
    });
  }
}
