import makeListCategoriesUseCase from './list-categories';
import makePostItineraryUseCase from './post-itinerary';

import db from '../data-access';

const listCategoriesUseCase = makeListCategoriesUseCase({ db });
const postItineraryUseCase = makePostItineraryUseCase({ db });

const useCases = Object.freeze({
  listCategoriesUseCase,
  postItineraryUseCase
});

export default useCases;
export { listCategoriesUseCase, postItineraryUseCase };
