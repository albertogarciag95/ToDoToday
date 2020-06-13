import { AppError } from '../errors/AppError';

import makeUser from '../entities';

export default function makePostPlaceUseCase({ db }) {

  return async function postPlaceUseCase(userInfo) {

    const user = makeUser(userInfo);

    // const exists = await db.findPlaceByTitle(place.getTitle());
    // if (exists.length !== 0) {
    //   return exists;
    // }

    // return db.postPlace({
    //   title: place.getTitle(),
    //   description: place.getDescription(),
    //   category: place.getCategory(),
    //   latitude: place.getLatitude(),
    //   longitude: place.getLongitude(),
    //   location: place.getLocation(),
    //   price_per_person: place.getPrice(),
    //   dateStart: place.getDateStart(),
    //   dateEnd: place.getDateEnd()
    // });
  }
}
