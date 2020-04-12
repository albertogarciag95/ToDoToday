export default function makeListCategoriesUseCase({ categoriesDb }) {

  return async function listCategoriesUseCase () {

    return await categoriesDb.getAllCategories();
  }
}
