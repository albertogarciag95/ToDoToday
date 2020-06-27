
import {
  listCategoriesUseCase,
  postItineraryUseCase,
  startItineraryUseCase,
  saveUserItineraryUseCase,
  postPlaceUseCase,
  removePlaceUseCase,
  listPlacesUseCase,
  postUserUseCase,
  loginUseCase,
  tokenUseCase,
  logoutUseCase
} from '../use-cases';

import makeListCategoriesController from './list-categories';
import makePostItineraryController from './post-itinerary';
import makeAddItineraryController from './start-itinerary';
import makeAddRealPlacesController from './add-real-places';
import makeRemovePastPlacesController from './remove-past-places';
import makePostUserController from './post-user';
import makeLoginController from './login';
import makeTokenController from './token';
import makeLogoutController from './logout';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });
const addRealPlacesController = makeAddRealPlacesController({ postPlaceUseCase });
const postItineraryController = makePostItineraryController({ postItineraryUseCase });
const startItineraryController = makeAddItineraryController({ startItineraryUseCase, saveUserItineraryUseCase });
const postUserController = makePostUserController({ postUserUseCase })
const removePastPlacesController = makeRemovePastPlacesController({ removePlaceUseCase, listPlacesUseCase });
const loginController = makeLoginController({ loginUseCase });
const tokenController = makeTokenController({ tokenUseCase });
const logoutController = makeLogoutController({ logoutUseCase });

const controllers = Object.freeze({
  listCategoriesController,
  postItineraryController,
  startItineraryController,
  addRealPlacesController,
  removePastPlacesController,
  postUserController,
  loginController,
  tokenController,
  logoutController
});

export default controllers;
export {
  listCategoriesController,
  postItineraryController,
  startItineraryController,
  addRealPlacesController,
  removePastPlacesController,
  postUserController,
  loginController,
  tokenController,
  logoutController
};
