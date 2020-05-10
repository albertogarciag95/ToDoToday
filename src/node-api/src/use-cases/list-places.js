export default function makeListPlacesUseCase({ db }) {

  return async function listPlacesUseCase () {

    return await db.getAllPlaces();
  }
}
