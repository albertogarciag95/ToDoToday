import makeListCategoriesUseCase from './list-categories';
import makePostItineraryUseCase from './post-itinerary';
import makePostPlaceUseCase from './post-place';

import db from '../data-access';

const listCategoriesUseCase = makeListCategoriesUseCase({ db });
const postItineraryUseCase = makePostItineraryUseCase({ db });
const postPlaceUseCase = makePostPlaceUseCase({ db });

const useCases = Object.freeze({
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase
});

export default useCases;
export { listCategoriesUseCase, postItineraryUseCase, postPlaceUseCase };
