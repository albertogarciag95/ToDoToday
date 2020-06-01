import Constants from '../constants';
import { AppError } from '../errors/AppError';

export default function makePostItineraryUseCase({ db, coordinates }) {

  let currentPlaces = [];

  function getPlacesByQueryParams({ date, category, secondCategory, lunchCategory, dinnerCategory }) {
    let promises = [];
    promises.push(queryPlaces(category, date));
    promises.push(queryPlaces(secondCategory, date));
    promises.push(queryPlaces(lunchCategory));
    promises.push(queryPlaces(dinnerCategory));

    return Promise.all(promises).then(response => {
      return {
        categoryPlaces: response[0],
        secondCategoryPlaces: response[1],
        lunchPlaces: response[2],
        dinnerPlaces: response[3]
      }
    }).catch(error => {
      throw new AppError("Error in getPlacesByQueryParams", 400);
    })
  }

  function queryPlaces({ selected:categoryName, price }, date) {
    return db.getCategoryByName(categoryName).then(
      async result => {
        if(result.length !== 0) {
          return await db.queryPlaces({ category: result[0]._id, price, date });
        } else {
          throw new AppError("Bad request: category given was not found", 400);
        }
      }
    ).catch((error) => {
      throw new AppError("Error in queryPlaces", 400);
    });
  }

  function getNearbyPlaces(places, startingPoint, howMany = 1) {
    let nearbyPlaces = [];
    if(places.length === 0 || startingPoint === "") return [];
    places.forEach(place => {
      nearbyPlaces.push({
        place,
        distance: coordinates.getDistanceBetweenCoordinates(startingPoint, place)
      });
    });

    nearbyPlaces =
    nearbyPlaces.sort((placeA, placeB) => placeA.distance > placeB.distance ? 1 : -1)
      .filter(place => place.distance != 0)
      .filter(({ place }) => !currentPlaces.includes(place.title));

    nearbyPlaces.length = howMany;

    return nearbyPlaces;
  }

  function createItinerary(firstPlace, { lunchPlaces, secondCategoryPlaces, dinnerPlaces}) {
    let startingPoint = firstPlace.place;
    currentPlaces.push(startingPoint.title);
    const nearbyLunchPlaces = getNearbyPlaces(lunchPlaces, startingPoint || "");

    startingPoint = nearbyLunchPlaces[0].place;
    currentPlaces.push(startingPoint.title);
    const nearbySecondCategoryPlaces = getNearbyPlaces(secondCategoryPlaces, startingPoint || "");

    if(nearbySecondCategoryPlaces.length !== 0) {
      startingPoint = nearbySecondCategoryPlaces[0].place;
      currentPlaces.push(startingPoint.title);
    }
    const nearbyDinnerPlaces = getNearbyPlaces(dinnerPlaces, startingPoint || "");

    if(nearbyDinnerPlaces.length !== 0) {
      currentPlaces.push(nearbyDinnerPlaces[0].place.title);
    }

    return {
      lunchPlace: nearbyLunchPlaces[0],
      secondPlace: nearbySecondCategoryPlaces[0],
      dinnerPlace: nearbyDinnerPlaces[0]
    }
  }

  return async function postItineraryUseCase(body) {
    const result = [];
    currentPlaces = [];

    if(!body) {
      throw new AppError('body is required', 400);
    }
    const { date, category, userLocation } = body;

    if(!date || !category || !userLocation) {
      throw new AppError('missing required fields', 400);
    }

    const filteredPlaces = await getPlacesByQueryParams(body);

    Object.values(filteredPlaces).forEach(places => {
      if(places.length === 0) {
        throw new AppError('Itinerary not found with given parameters', 404);
      }
    })

    const nearbyFirstPlaces = getNearbyPlaces(filteredPlaces.categoryPlaces, userLocation, Constants.NUMBER_OF_ROUTES);

    nearbyFirstPlaces.forEach(place => {
      result.push({
        firstPlace: place,
        ...createItinerary(place, filteredPlaces)
      })
    })

    return result;
  }
}
