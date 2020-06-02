import chai from 'chai';
import spies from 'chai-spies';

import { AppError } from '../../src/errors/AppError';
import makeListCategoryController from '../../src/controllers/list-categories';
import { listCategoriesController } from '../../src/controllers';
import { listCategoriesUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('List categories controller test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(listCategoriesUseCase);

  it('list caregories controller goes fine', () => {
    listCategoriesController().then(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response).to.have.property('body');
    });
  });

  it('list categories controller goes wrong', () => {
    const listCategoryController = makeListCategoryController({
      listCategoriesUseCase: () => {
        throw new AppError('Pow!', 400);
      }
    });
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: 'Pow!'
    }

    listCategoryController().then(actual => {
      expect(actual).to.deep.equal(expected);
    });
  });

});
