import makeListCategoriesUseCase from './list-categories';
import makePostItineraryUseCase from './post-itinerary';
import makePostPlaceUseCase from './post-place';
import makeListPlacesUseCase from './list-places';
import makeRemovePlaceUseCase from './remove-place';
import makePostUserUseCase from './post-user';
import makeLoginUseCase from './login';

import db from '../adapters/data-access';
import coordinates from '../adapters/coordinates';
import auth from '../adapters/authentication';

const listCategoriesUseCase = makeListCategoriesUseCase({ db });
const postItineraryUseCase = makePostItineraryUseCase({ db, coordinates });
const postPlaceUseCase = makePostPlaceUseCase({ db });
const listPlacesUseCase = makeListPlacesUseCase({ db });
const removePlaceUseCase = makeRemovePlaceUseCase({ db });
const postUserUseCase = makePostUserUseCase({ db });
const loginUseCase = makeLoginUseCase({ db, auth });

const useCases = Object.freeze({
  listCategoriesUseCase,
  postItineraryUseCase,
  postPlaceUseCase,
  listPlacesUseCase,
  removePlaceUseCase,
  postUserUseCase,
  loginUseCase
});

export default useCases;
export { listCategoriesUseCase, postItineraryUseCase, postPlaceUseCase, listPlacesUseCase, removePlaceUseCase, postUserUseCase, loginUseCase };
