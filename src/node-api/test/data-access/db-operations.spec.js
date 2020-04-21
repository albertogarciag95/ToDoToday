import db from '../../src/data-access';
import chai from 'chai';
import mongoose from 'mongoose';

const expect = chai.expect;

describe('categories collection operations', () => {

  it('lists categories', async () => {
    await db.getAllCategories().then(categories => {
      expect(categories).to.have.lengthOf(7);
    });
  })

  after(() => {
    mongoose.connection.close();
  });
})
