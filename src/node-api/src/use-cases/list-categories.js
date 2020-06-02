import { AppError } from "../errors/AppError";

export default function makeListCategoriesUseCase({ db }) {

  return async function listCategoriesUseCase () {

    const categories = await db.getAllCategories();
    if(categories.length === 0) {
      throw new AppError('Category list is empty', 400);
    }

    return categories;
  }
}
