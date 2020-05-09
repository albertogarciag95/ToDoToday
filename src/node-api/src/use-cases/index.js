import makeListCategoriesUseCase from './list-categories';
import makePostItineraryUseCase from './post-itinerary';
import makePostPlaceUseCase from './post-place';

import db from '../adapters/data-access';
import coordinates from '../adapters/coordinates';

const listCategoriesUseCase = makeListCategoriesUseCase({ db });
const postItineraryUseCase = makePostItineraryUseCase({ db, coordinates });
const postPlaceUseCase = makePostPlaceUseCase({ db });

const useCases = Object.freeze({
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase
});

export default useCases;
export { listCategoriesUseCase, postItineraryUseCase, postPlaceUseCase };
