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
        if(result) {
          const categoryPlaces = await db.queryPlaces({ category: result[0]._id });
          categoryPlaces.map(place => place.category = result.name);
          return categoryPlaces;
        } else {
          return [];
        }
      }
    ).catch(error => error);
  }

  function getNearbyPlaces(places, startingPoint) {
    let distances = [];
    if(places.length === 0) return [];
    
    places.forEach(place => {
      startingPoint,
      distances.push({
        place,
        distance: coordinates.getDistanceBetweenCoordinates(startingPoint, place)
      });
    });

    return distances.sort((placeA, placeB) => placeA.distance > placeB.distance ? 1 : -1);
  }

  function createItinerary(firstPlace, filteredPlaces) {
    const secondPlaces = getNearbyPlaces(filteredPlaces.secondCategoryPlaces, firstPlace);
    secondPlaces.length = 1;

    const lunchPlaces = getNearbyPlaces(filteredPlaces.lunchPlaces, secondPlaces[0]);
    lunchPlaces.length = 1;

    const dinnerPlaces = getNearbyPlaces(filteredPlaces.dinnerPlaces, lunchPlaces[0]);

    return { secondPlace: secondPlaces[0], lunchPlace: lunchPlaces[0], dinnerPlace: dinnerPlaces[0] }
  }


  return async function postItineraryUseCase(body) {
    const { category, userLocation } = body;

    if(!body) {
      throw new Error('body is required');
    }

    if(!category || userLocation.length === 0) {
      throw new Error('missing required fields');
    }

    const userCoordinates = { latitude: userLocation[0], longitude: userLocation[1] }

    const filteredPlaces = await getPlacesByQueryParams(body);
    const nearbyFirstPlaces = getNearbyPlaces(filteredPlaces.categoryPlaces, userCoordinates);

    nearbyFirstPlaces.length = 2;

    return {
      firstOption: {
        firstPlace: nearbyFirstPlaces[0],
        ...createItinerary(nearbyFirstPlaces[0], filteredPlaces),
      },
      secondOption: {
        firstPlace: nearbyFirstPlaces[1],
        ...createItinerary(nearbyFirstPlaces[1], filteredPlaces)
      }
    };

  }
}
