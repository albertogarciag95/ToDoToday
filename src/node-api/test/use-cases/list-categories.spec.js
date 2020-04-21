import chai from 'chai';
import spies from 'chai-spies';
import { listCategoriesUseCase } from '../../src/use-cases';
import db from '../../src/data-access';
import mongoose from 'mongoose';

const expect = chai.expect;

describe('List categories use-case test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(db.getAllCategories);

  it('listCategoriesUseCase goes fine', async () => {
    await listCategoriesUseCase().then(() => {
      expect(useCaseSpy).to.have.been.called;
    })
  });

  after(() => {
    mongoose.connection.close();
  });

});
