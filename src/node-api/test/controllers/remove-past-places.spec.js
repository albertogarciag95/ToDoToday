import chai from 'chai';
import spies from 'chai-spies';

import { removePastPlacesController } from '../../src/controllers';
import { removePlaceUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Remove real places controller test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(removePlaceUseCase);

  it('removeRealPlaces controller goes fine', () => {
    removePastPlacesController().then(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response).to.be.an('object');
      expect(response.statusCode === 200).to.be.true;

      expect(response.body[0]).to.have.property('title');
      expect(response.body[0]).to.have.property('latitude');
      expect(response.body[0]).to.have.property('longitude');
    });
  });
});
