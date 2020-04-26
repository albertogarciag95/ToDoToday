import chai from 'chai';
import spies from 'chai-spies';
import mongoose from 'mongoose';

import makeListCategoryController from '../../src/controllers/list-categories';
import { listCategoriesController } from '../../src/controllers';
import { listCategoriesUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('List categories controller test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(listCategoriesUseCase);

  it('list caregories controller goes fine', async () => {
    const response = await listCategoriesController();
    expect(useCaseSpy).to.have.been.called;
    expect(response).to.have.property('body');
  });

  it('list categories controller goes wrong', async () => {
    const listCategoryController = makeListCategoryController({
      listCategoriesUseCase: () => {
        throw Error('Pow!')
      }
    });
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    }
    const actual = await listCategoryController();
    expect(actual).to.deep.equal(expected);
  });

  after(() => mongoose.connection.close());

});
