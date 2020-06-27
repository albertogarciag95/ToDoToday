import { AppError } from '../errors/AppError';

export default function makeSaveUserItineraryUseCase({ db }) {

  return async function saveUserItineraryUseCase(itineraryId, user) {

    if(!itineraryId) {
      throw new AppError('Not itineraryId given', 400);
    }

    const userFound = await db.findUser(null, user.userName);
    if(!userFound) {
      throw new AppError('User logged does not exist', 401);
    }

    return db.saveUserItinerary(itineraryId, userFound[0]);
  }
}
