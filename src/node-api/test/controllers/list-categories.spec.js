import chai from 'chai';
import spies from 'chai-spies';
import { listCategoriesController } from '../../src/controllers';
import { listCategoriesUseCase } from '../../src/use-cases';
import mongoose from 'mongoose';

const expect = chai.expect;

describe('List categories controller test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(listCategoriesUseCase);

  it('listCategoriesUseCase goes fine', async function() {
    await listCategoriesController().then(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response).to.have.property('body');
    });
  });

  after(() => {
    mongoose.connection.close();
  });

});
