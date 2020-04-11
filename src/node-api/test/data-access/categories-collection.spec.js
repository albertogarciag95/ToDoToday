import { categoriesDb } from '../../src/data-access';
import chai from 'chai';

const expect = chai.expect;

describe('categories collection operations', () => {
  const { getAllCategories } = categoriesDb;

  it('lists categories', async () => {
    const categories = await getAllCategories();
    expect(categories).to.have.lengthOf(6);
  })
})
