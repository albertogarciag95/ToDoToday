
import {
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase,
  removePlaceUseCase,
  listPlacesUseCase,
  postUserUseCase
} from '../use-cases';

import makeListCategoriesController from './list-categories';
import makePostItineraryController from './post-itinerary';
import makeAddRealPlacesController from './add-real-places';
import makeRemovePastPlacesController from './remove-past-places';
import makePostUserController from './post-user';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });
const addRealPlacesController = makeAddRealPlacesController({ postPlaceUseCase });
const postItineraryController = makePostItineraryController({ postItineraryUseCase });
const postUserController = makePostUserController({ postUserUseCase })
const removePastPlacesController = makeRemovePastPlacesController({ removePlaceUseCase, listPlacesUseCase });

const controllers = Object.freeze({
  listCategoriesController,
  postItineraryController,
  addRealPlacesController,
  removePastPlacesController,
  postUserController
});

export default controllers;
export {
  listCategoriesController,
  postItineraryController,
  addRealPlacesController,
  removePastPlacesController,
  postUserController
};
