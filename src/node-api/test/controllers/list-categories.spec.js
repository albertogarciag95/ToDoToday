import chai from 'chai';
import spies from 'chai-spies';
import { listCategoriesController } from '../../src/controllers';
import { listCategoriesUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('List categories controller test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(listCategoriesUseCase);

  it('listCategoriesUseCase goes fine', function() {
    listCategoriesController().then(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response).to.have.property('body');
    });
  });

});
