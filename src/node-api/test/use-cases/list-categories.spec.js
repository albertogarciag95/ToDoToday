import chai from 'chai';
import spies from 'chai-spies';
import { listCategoriesUseCase } from '../../src/use-cases';
import { categoriesDb } from '../../src/data-access';

const expect = chai.expect;

describe('List categories use-case test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(categoriesDb.getAllCategories);

  it('listCategoriesUseCase goes fine', async function() {
    listCategoriesUseCase();
    expect(useCaseSpy).to.have.been.called;
  });

});
