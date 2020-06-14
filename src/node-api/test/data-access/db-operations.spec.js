import chai from 'chai';
import db from '../../src/adapters/data-access';

const expect = chai.expect;

describe('db operations', () => {

  it('lists categories', () => {
    db.getAllCategories().then(categories => {
      expect(categories).to.have.lengthOf(16);
    });
  })

  it('query places', () => {
    db.queryPlaces({ category: 'Cultura y sociedad', price: { initRange: 0, finalRange: 5 } })
      .then(places => {
        expect(places).to.be.an('array');
      });
  });

  it('find user', () => {
    db.findUser('test', 'test@test').then(users => {
      expect(users).to.be.an('array');
    });
  });

  it('post user', () => {
    db.postUser({ name: 'Test', password: 'Alberto1' }).then(user => {
      expect(user).to.have.property('name');
    });
  });

  it('delete user', () => {
    db.removeUser({ name: 'Test', password: 'Alberto1' }).then(user => {
      expect(user).to.have.property('deletedCount');
    });
  });

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
