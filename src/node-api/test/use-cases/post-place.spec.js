import chai from 'chai';
import spies from 'chai-spies';
import db from '../../src/adapters/data-access';

import { postPlaceUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Post itinerary use-case test', function() {

  chai.use(spies);
  const dbSpy = chai.spy(db.postPlace);

  it('postPlaceUseCase goes wrong, body expected', () => {
    postPlaceUseCase({ category: 'Cultura y sociedad' }).then(response => {
      expect(dbSpy).to.have.been.called;
    }).catch(e => e);
  });

  it('postPlaceUseCase no category given', () => {
    postPlaceUseCase({ }, null).catch(error => {
      expect(error).to.be.an('error');
      expect(error).to.have.property('message');
      expect(error.message).to.be.a('string', 'Error in postPlaceUseCase: no category given')
    });
  });


});
