
import { listCategoriesUseCase } from '../use-cases';
import makeListCategoriesController from './list-categories';

const listCategoriesController = makeListCategoriesController({ listCategoriesUseCase });

const controllers = Object.freeze({
  listCategoriesController
});

export default controllers;
export { listCategoriesController };
