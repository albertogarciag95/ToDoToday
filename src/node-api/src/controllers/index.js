
import {
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase,
  removePlaceUseCase,
  listPlacesUseCase,
  postUserUseCase,
  loginUseCase,
  tokenUseCase
} from '../use-cases';

import makeListCategoriesController from './list-categories';
import makePostItineraryController from './post-itinerary';
import makeAddRealPlacesController from './add-real-places';
import makeRemovePastPlacesController from './remove-past-places';
import makePostUserController from './post-user';
import makeLoginController from './login';
import makeTokenController from './token';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });
const addRealPlacesController = makeAddRealPlacesController({ postPlaceUseCase });
const postItineraryController = makePostItineraryController({ postItineraryUseCase });
const postUserController = makePostUserController({ postUserUseCase })
const removePastPlacesController = makeRemovePastPlacesController({ removePlaceUseCase, listPlacesUseCase });
const loginController = makeLoginController({ loginUseCase });
const tokenController = makeTokenController({ tokenUseCase });

const controllers = Object.freeze({
  listCategoriesController,
  postItineraryController,
  addRealPlacesController,
  removePastPlacesController,
  postUserController,
  loginController,
  tokenController
});

export default controllers;
export {
  listCategoriesController,
  postItineraryController,
  addRealPlacesController,
  removePastPlacesController,
  postUserController,
  loginController,
  tokenController
};
