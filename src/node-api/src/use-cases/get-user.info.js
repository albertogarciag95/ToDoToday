import { AppError } from "../errors/AppError";
import makeItinerary from "../entities/itinerary";
import makePlace from "../entities/place";

export default function makeGetUserInfoUseCase({ db }) {

  return async function getUserInfoUseCase ({ userName }) {


    async function getPlacesInfo(placesIds) {
      let placesInfo = [];

      for (let index = 0; index < placesIds.length; index++) {
        const exists = await db.findPlaceById(placesIds[index]);
        if (exists.length === 0) {
          throw new AppError('Itinerary place does not exist', 404);
        }
        const placeInfo = makePlace(exists[0]);

        const category = await db.getCategoryById(placeInfo.getCategory());
        console.log(category);

        placesInfo.push({
          title: placeInfo.getTitle(),
          description: placeInfo.getDescription(),
          category: category[0].name,
          latitude: placeInfo.getLatitude(),
          longitude: placeInfo.getLongitude(),
          location: placeInfo.getLocation(),
          price_per_person: placeInfo.getPrice()
        });
      }

      return placesInfo;
    }

    if(!userName) {
      throw new AppError('UserName is missing', 400);
    }

    const userFound = await db.findUser(null, userName);
    if(userFound.length === 0) {
      throw new AppError('User not found', 400);
    }

    let itinerariesInfo = [];
    let userItineraries = userFound[0].itineraries;
    for (let index = 0; index < userItineraries.length; index++) {
      const exists = await db.findItineraryById(userItineraries[index]);
      if (exists.length === 0) {
        throw new AppError('Itinerary does not exist', 404);
      }
      const itineraryInfo = makeItinerary(exists[0]);

      itinerariesInfo.push({
        places: await getPlacesInfo(itineraryInfo.getPlaces()),
        totalDistance: itineraryInfo.getTotalDistance(),
        totalPrice: itineraryInfo.getTotalPrice(),
        startPoint: itineraryInfo.getStartPoint(),
        startDate: itineraryInfo.getStartDate()
      });
    }

    return {
      name: userFound[0].name,
      userName: userFound[0].userName,
      birthDate: userFound[0].birthDate,
      email: userFound[0].email,
      userImage: userFound[0].file,
      itineraries: itinerariesInfo
    };
  }
}
