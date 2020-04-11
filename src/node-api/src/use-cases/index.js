import makeListCategoriesUseCase from './list-categories';
import { categoriesDb } from '../data-access';


const listCategoriesUseCase = makeListCategoriesUseCase({ categoriesDb });

const useCases = Object.freeze({
  listCategoriesUseCase
});

export default useCases;
export { listCategoriesUseCase };
