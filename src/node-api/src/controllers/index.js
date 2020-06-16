
import {
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase,
  removePlaceUseCase,
  listPlacesUseCase,
  postUserUseCase,
  loginUseCase
} from '../use-cases';

import makeListCategoriesController from './list-categories';
import makePostItineraryController from './post-itinerary';
import makeAddRealPlacesController from './add-real-places';
import makeRemovePastPlacesController from './remove-past-places';
import makePostUserController from './post-user';
import makeLoginController from './login';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });
const addRealPlacesController = makeAddRealPlacesController({ postPlaceUseCase });
const postItineraryController = makePostItineraryController({ postItineraryUseCase });
const postUserController = makePostUserController({ postUserUseCase })
const removePastPlacesController = makeRemovePastPlacesController({ removePlaceUseCase, listPlacesUseCase });
const loginController = makeLoginController({ loginUseCase });

const controllers = Object.freeze({
  listCategoriesController,
  postItineraryController,
  addRealPlacesController,
  removePastPlacesController,
  postUserController,
  loginController
});

export default controllers;
export {
  listCategoriesController,
  postItineraryController,
  addRealPlacesController,
  removePastPlacesController,
  postUserController,
  loginController
};
