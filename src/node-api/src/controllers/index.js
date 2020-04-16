
import {
  listCategoriesUseCase,
  postItineraryUseCase
} from '../use-cases';

import makeListCategoriesController from './list-categories';
import makePostItineraryController from './post-itinerary';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });
const postItineraryController = makePostItineraryController({ postItineraryUseCase });

const controllers = Object.freeze({
  listCategoriesController,
  postItineraryController
});

export default controllers;
export { listCategoriesController, postItineraryController };
