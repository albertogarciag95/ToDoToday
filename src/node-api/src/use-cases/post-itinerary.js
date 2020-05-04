export default function makePostItineraryUseCase({ db }) {

  return async function postItineraryUseCase(body) {
    if(!body) {
      throw new Error('body is required');
    }

    const { category } = body;
    let query = {};

    await db.getCategoryByName(category).then(
      category => {
        query = Object.assign({}, { category: category[0]._id })
      }
    );

    const places = await db.queryPlaces(query);
    places.map(place => place.category = category.name);

    return places;
  }
}
