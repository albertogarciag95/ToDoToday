import makePlace from '../entities/place';

export default function makeRemovePlaceUseCase({ db }) {

  return async function removePlacesUseCase(placeInfo) {

    const place = makePlace(placeInfo);
    const exists = await db.findPlaceByTitle(place.getTitle());
    if (exists.length === 0) {
      throw Error('Place you are trying to delete does not exist');
    }

    return db.removePlace({
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
