import chai from 'chai';
import db from '../../src/data-access';

const expect = chai.expect;

describe('categories collection operations', () => {

  it('lists categories', () => {
    return db.getAllCategories().then(categories => {
      expect(categories).to.have.lengthOf(6);
    });
  })

  // it('query places', () => {
  //   return db.getAllCategories().then(categories => {
  //     expect(categories).to.have.lengthOf(6);
  //   });
  // })

})
