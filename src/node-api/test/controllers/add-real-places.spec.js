import chai from 'chai';
import spies from 'chai-spies';

import { addRealPlacesController } from '../../src/controllers';
import { postPlaceUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Add real places controller test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(postPlaceUseCase);

  it('addRealPlaces controller goes fine', () => {
    addRealPlacesController().then(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response.body).to.be.an('array');
      expect(response.statusCode === 200).to.be.true;
    });
  });
});
