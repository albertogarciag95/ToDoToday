
import {
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase
} from '../use-cases';

import makeListCategoriesController from './list-categories';
import makePostItineraryController from './post-itinerary';
import makeAddRealPlacesController from './add-real-places';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });
const addRealPlacesController = makeAddRealPlacesController({ postPlaceUseCase });
const postItineraryController = makePostItineraryController({ postItineraryUseCase });

const controllers = Object.freeze({
  listCategoriesController,
  postItineraryController,
  addRealPlacesController
});

export default controllers;
export { listCategoriesController, postItineraryController, addRealPlacesController };
