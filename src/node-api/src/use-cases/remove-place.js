import makePlace from '../entities/place';
import { AppError } from '../errors/AppError';

export default function makeRemovePlaceUseCase({ db }) {

  return async function removePlacesUseCase(placeInfo) {

    const place = makePlace(placeInfo);
    const exists = await db.findPlaceByTitle(place.getTitle());
    if (exists.length === 0) {
      throw new AppError('Place you are trying to delete does not exist', 404);
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
