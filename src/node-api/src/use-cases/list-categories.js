export default function makeListCategoriesUseCase ({ db }) {

  return async function listCategoriesUseCase () {

    return await db.getAllCategories();
  }
}
