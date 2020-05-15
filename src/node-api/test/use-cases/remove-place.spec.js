import chai from 'chai';
import spies from 'chai-spies';
import db from '../../src/adapters/data-access';

import { removePlaceUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Remove place use-case test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(db.findPlaceByTitle.bind(this, 'fake'));

  it('remove existing place', () => {
    removePlaceUseCase(
      { title: "fake", description: 'fake', category: 1, latitude: 1, longitude: 1, location: 'fake' }
      ).then(() => {
      expect(useCaseSpy).to.have.been.called;
    })
  });

});
