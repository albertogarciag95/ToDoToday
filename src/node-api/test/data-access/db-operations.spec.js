import db from '../../src/data-access';
import chai from 'chai';

const expect = chai.expect;

describe('categories collection operations', () => {

  it('lists categories', () => {
    db.getAllCategories().then(categories => {
      expect(categories).to.have.lengthOf(6);
    });
  })
})
