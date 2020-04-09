import makeListCategoriesUseCase from './list-categories';
import db from '../data-access';

const listCategoriesUseCase = makeListCategoriesUseCase({ db });

const useCases = Object.freeze({
  listCategoriesUseCase
});

export default useCases;
export { listCategoriesUseCase };
