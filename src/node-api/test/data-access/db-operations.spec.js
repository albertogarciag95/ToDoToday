import chai from 'chai';
import db from '../../src/data-access';

const expect = chai.expect;

describe('db operations', () => {

  it('lists categories', () => {
    db.getAllCategories().then(categories => {
      expect(categories).to.have.lengthOf(6);
    });
  })

  // it('query places', () => {
  //   return db.getAllCategories().then(categories => {
  //     expect(categories).to.have.lengthOf(6);
  //   });
  // })

})
