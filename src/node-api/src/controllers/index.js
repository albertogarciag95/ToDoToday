
import {
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase,
  removePlaceUseCase,
  listPlacesUseCase
} from '../use-cases';

import makeListCategoriesController from './list-categories';
import makePostItineraryController from './post-itinerary';
import makeAddRealPlacesController from './add-real-places';
import makeRemovePastPlacesController from './remove-past-places';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });
const addRealPlacesController = makeAddRealPlacesController({ postPlaceUseCase });
const postItineraryController = makePostItineraryController({ postItineraryUseCase });
const removePastPlacesController = makeRemovePastPlacesController({ removePlaceUseCase, listPlacesUseCase });

const controllers = Object.freeze({
  listCategoriesController,
  postItineraryController,
  addRealPlacesController,
  removePastPlacesController
});

export default controllers;
export { listCategoriesController, postItineraryController, addRealPlacesController, removePastPlacesController };
