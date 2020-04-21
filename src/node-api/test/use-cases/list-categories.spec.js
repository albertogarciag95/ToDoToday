import chai from 'chai';
import spies from 'chai-spies';
import { listCategoriesUseCase } from '../../src/use-cases';
import db from '../../src/data-access';

const expect = chai.expect;

describe('List categories use-case test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(db.getAllCategories);

  it('listCategoriesUseCase goes fine', () => {
    listCategoriesUseCase().then(() => {
      expect(useCaseSpy).to.have.been.called;
    })
  });

});
