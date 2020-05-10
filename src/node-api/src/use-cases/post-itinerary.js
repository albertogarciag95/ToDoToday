import Constants from '../constants';

export default function makePostItineraryUseCase({ db, coordinates }) {

  function getPlacesByQueryParams({ category, secondCategory, lunchCategory, dinnerCategory }) {
    let promises = [];
    promises.push(queryPlaces({ category }));
    promises.push(queryPlaces({ category: secondCategory }));
    promises.push(queryPlaces({ category: lunchCategory }));
    promises.push(queryPlaces({ category: dinnerCategory }));

    return Promise.all(promises).then(response => {
      return {
        categoryPlaces: response[0],
        secondCategoryPlaces: response[1],
        lunchPlaces: response[2],
        dinnerPlaces: response[3]
      }
    }).catch(error => error)
  }

  function queryPlaces({ category }) {
    return db.getCategoryByName(category).then(
      async result => {
        if(result.length !== 0) {
          const categoryPlaces = await db.queryPlaces({ category: result[0]._id });
          categoryPlaces.map(place => place.category = result[0].name);
          return categoryPlaces;
        } else {
          return [];
        }
      }
    ).catch(error => error);
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

    nearbyPlaces
      .sort((placeA, placeB) => placeA.distance > placeB.distance ? 1 : -1)
      .filter(place => place.distance != 0);

    nearbyPlaces.length = howMany;

    return nearbyPlaces;
  }

  function createItinerary(firstPlace, { lunchPlaces, secondCategoryPlaces, dinnerPlaces}) {
    let startingPoint = firstPlace.place;
    const nearbyLunchPlaces = getNearbyPlaces(lunchPlaces, startingPoint || "");

    if(nearbyLunchPlaces.length !== 0) {
      startingPoint = nearbyLunchPlaces[0].place;
    }
    const nearbySecondCategoryPlaces = getNearbyPlaces(secondCategoryPlaces, startingPoint || "");

    if(nearbySecondCategoryPlaces.length !== 0) {
      startingPoint = nearbySecondCategoryPlaces[0].place;
    }
    const nearbyDinnerPlaces = getNearbyPlaces(dinnerPlaces, startingPoint || "");

    return {
      lunchPlace: nearbyLunchPlaces[0],
      secondPlace: nearbySecondCategoryPlaces[0],
      dinnerPlace: nearbyDinnerPlaces[0]
    }
  }

  return async function postItineraryUseCase(body) {
    const { category, userLocation } = body;
    const result = [];

    if(!body) {
      throw new Error('body is required');
    }

    if(!category || userLocation.length === 0) {
      throw new Error('missing required fields');
    }

    const userCoordinates = { latitude: userLocation[0], longitude: userLocation[1] };

    const filteredPlaces = await getPlacesByQueryParams(body);
    const nearbyFirstPlaces = getNearbyPlaces(filteredPlaces.categoryPlaces, userCoordinates, Constants.NUMBER_OF_ROUTES);

    nearbyFirstPlaces.forEach(place => {
      result.push({
        firstPlace: place,
        ...createItinerary(place, filteredPlaces)
      })
    })

    return result;

  }
}
