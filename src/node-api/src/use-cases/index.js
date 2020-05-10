import makeListCategoriesUseCase from './list-categories';
import makePostItineraryUseCase from './post-itinerary';
import makePostPlaceUseCase from './post-place';
import makeListPlacesUseCase from './list-places';
import makeRemovePlaceUseCase from './remove-place';

import db from '../adapters/data-access';
import coordinates from '../adapters/coordinates';

const listCategoriesUseCase = makeListCategoriesUseCase({ db });
const postItineraryUseCase = makePostItineraryUseCase({ db, coordinates });
const postPlaceUseCase = makePostPlaceUseCase({ db });
const listPlacesUseCase = makeListPlacesUseCase({ db });
const removePlaceUseCase = makeRemovePlaceUseCase({ db });

const useCases = Object.freeze({
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase,
  listPlacesUseCase,
  removePlaceUseCase
});

export default useCases;
export { listCategoriesUseCase, postItineraryUseCase, postPlaceUseCase, listPlacesUseCase, removePlaceUseCase };
