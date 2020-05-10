import chai from 'chai';
import db from '../../src/data-access';

const expect = chai.expect;

describe('db operations', () => {

  it('lists categories', () => {
    db.getAllCategories().then(categories => {
      expect(categories).to.have.lengthOf(12);
    });
  })

  it('query places', () => {
    db.queryPlaces({ category: 'Cultura y sociedad' }).then(places => {
      expect(places).to.be.an('array');
    });
  })

  it('post place', () => {
    db.postPlace({ title: 'Test', description: 'Test' }).then(place => {
      expect(place).to.have.property('title');
      expect(place).to.have.property('description');
    });
  })

  it('delete place', () => {
    db.removePlace({ title: 'Test' }).then(result => {
      expect(result).to.have.property('deletedCount');
    });
  })

})
