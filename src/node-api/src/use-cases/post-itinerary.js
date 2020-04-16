export default function makePostItineraryUseCase({ db }) {

  return async function postItineraryUseCase(body) {
    if(!body) {
      throw new Error('body is required');
    }

    return await db.queryPlaces(body);
  }
}
