import makeListCategoriesUseCase from './list-categories';
import makePostItineraryUseCase from './post-itinerary';
import makeStartItineraryUseCase from './start-itinerary';
import makeSaveUserItineraryUseCase from './save-user-itinerary';
import makePostPlaceUseCase from './post-place';
import makeListPlacesUseCase from './list-places';
import makeRemovePlaceUseCase from './remove-place';
import makePostUserUseCase from './post-user';
import makeLoginUseCase from './login';
import makeTokenUseCase from './token';
import makeLogoutUseCase from './logout';

import db from '../adapters/data-access';
import coordinates from '../adapters/coordinates';
import auth from '../adapters/authentication';

const listCategoriesUseCase = makeListCategoriesUseCase({ db });
const postItineraryUseCase = makePostItineraryUseCase({ db, coordinates });
const startItineraryUseCase = makeStartItineraryUseCase({ db });
const saveUserItineraryUseCase = makeSaveUserItineraryUseCase({ db });
const postPlaceUseCase = makePostPlaceUseCase({ db });
const listPlacesUseCase = makeListPlacesUseCase({ db });
const removePlaceUseCase = makeRemovePlaceUseCase({ db });
const postUserUseCase = makePostUserUseCase({ db });
const loginUseCase = makeLoginUseCase({ db, auth });
const tokenUseCase = makeTokenUseCase({ db, auth });
const logoutUseCase = makeLogoutUseCase({ db });

const useCases = Object.freeze({
  listCategoriesUseCase,
  postItineraryUseCase,
  startItineraryUseCase,
  saveUserItineraryUseCase,
  postPlaceUseCase,
  listPlacesUseCase,
  removePlaceUseCase,
  postUserUseCase,
  loginUseCase,
  tokenUseCase,
  logoutUseCase
});

export default useCases;
export {
  listCategoriesUseCase,
  postItineraryUseCase,
  startItineraryUseCase,
  saveUserItineraryUseCase,
  postPlaceUseCase,
  listPlacesUseCase,
  removePlaceUseCase,
  postUserUseCase,
  loginUseCase,
  tokenUseCase,
  logoutUseCase
};
