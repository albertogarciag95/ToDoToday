import chai from 'chai';
import spies from 'chai-spies';
import db from '../../src/adapters/data-access';

import { postUserUseCase } from '../../src/use-cases';
import makeUser from '../../src/entities/user';

const expect = chai.expect;

describe('Post user use-case test', function() {

  chai.use(spies);
  const dbFindUserSpy = chai.spy(db.findUser);
  const makeUserSpy = chai.spy(makeUser);
  const postUserSpy = chai.spy(db.findUser);

  it('postUserUseCase goes wrong, body expected', () => {
    postUserUseCase({ name: 'Test', userName: 'Test', email: 'test@test.com', birthDate: new Date(), password: 'test' })
      .then(() => {
        expect(makeUserSpy).to.have.been.called();
        expect(dbFindUserSpy).to.have.been.called();
        expect(postUserSpy.to.have.been.called())
      }).catch(e => e);
  });


  after(() => {
    db.removeUser({ name: 'Test', userName: 'Test', email: 'test@test.com', birthDate: new Date(), password: 'test' });
  })

});
