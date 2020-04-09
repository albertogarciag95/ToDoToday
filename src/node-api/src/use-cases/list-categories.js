export default function makeListCategoriesUseCase ({ db }) {

  return function listCategoriesUseCase () {

    return db.getAllCategories();
  }
}
