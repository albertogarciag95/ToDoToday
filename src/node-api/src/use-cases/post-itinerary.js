export default function makePostItineraryUseCase({ db }) {

  function queryPlaces(category) {
    return db.getCategoryByName(category).then(
      async result => {
        const categoryPlaces = await db.queryPlaces({ category: result[0]._id });
        categoryPlaces.map(place => place.category = category.name);
        return categoryPlaces;
      }
    );
  }

  return async function postItineraryUseCase(body) {
    if(!body) {
      throw new Error('body is required');
    }

    const { category, secondCategory, lunchCategory, dinnerCategory } = body;

    if(!category) {
      throw new Error('category body field is required');
    }

    let categoryPlaces, secondCategoryPlaces, lunchPlaces, dinnerPlaces;

    categoryPlaces = await queryPlaces(category).then(places => places);

    secondCategory ?
      secondCategoryPlaces = await queryPlaces(secondCategory).then(places => places) :
      secondCategoryPlaces = [];

    lunchCategory ?
      lunchPlaces = await queryPlaces(lunchCategory).then(places => places) :
      lunchPlaces = [];

    dinnerCategory ?
      dinnerPlaces = await queryPlaces(dinnerCategory).then(places => places) :
      dinnerPlaces = [];

    return { categoryPlaces, secondCategoryPlaces, lunchPlaces, dinnerPlaces };
  }
}
