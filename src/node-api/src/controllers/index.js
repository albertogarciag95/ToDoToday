
import {
  listCategoriesUseCase,
  postItineraryUseCase
} from '../use-cases';

import makeListCategoriesController from './list-categories';
import makePostItineraryController from './post-itinerary';
import makeListRealPlacesController from './list-real-places';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });
const listRealPlacesController = makeListRealPlacesController();
const postItineraryController = makePostItineraryController({ postItineraryUseCase });

const controllers = Object.freeze({
  listCategoriesController,
  postItineraryController,
  listRealPlacesController
});

export default controllers;
export { listCategoriesController, postItineraryController, listRealPlacesController };
