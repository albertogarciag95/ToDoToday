import { categoriesDb } from '../../src/data-access';
import chai from 'chai';

const expect = chai.expect;

describe('categories collection operations', () => {
  const { getAllCategories } = categoriesDb;

  it('lists categories', () => {
    getAllCategories().then(categories => {
      expect(categories).to.have.lengthOf(6);
    });
  })
})
