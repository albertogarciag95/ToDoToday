import makeItinerary from '../entities/itinerary';
import makePlace from '../entities/place';

export default function makeStartItineraryUseCase({ db }) {

  return async function startItineraryUseCase(itineraryInfo) {

    let placeIds = [];
    async function asyncForEach(foundPlaces, callback) {
      for (let index = 0; index < foundPlaces.length; index++) {
        await callback(foundPlaces[index]);
      }
    }

    await asyncForEach(itineraryInfo.places, async (place) => {
      const placeEntity = makePlace(place);
      const exists = await db.findPlaceByTitle(placeEntity.getTitle());
      if (exists.length === 0) {
        throw new AppError('Input itinerary place does not exist', 404);
      }
      placeIds.push(exists[0].id);
    });

    itineraryInfo.places = placeIds;

    const itinerary = makeItinerary(itineraryInfo);

    return db.postItinerary({
      places: itinerary.getPlaces(),
      totalDistance: itinerary.getTotalDistance(),
      totalPrice: itinerary.getTotalPrice(),
      startPoint: itinerary.getStartPoint(),
      startDate: itinerary.getStartDate()
    });
  }
}
