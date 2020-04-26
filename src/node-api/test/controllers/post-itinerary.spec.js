import chai from 'chai';
import spies from 'chai-spies';
import { postItineraryController } from '../../src/controllers';
import { postItineraryUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Post itinerary controller test', function() {

  chai.use(spies);
  const useCaseSpy = chai.spy(postItineraryUseCase);

  it('Post itinterary controller goes fine', () => {
    const httpRequest = {
      body: {
        category: { name: 'Cultura y sociedad' }
      }
    };
    return postItineraryController(httpRequest).then(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response.statusCode === 201).to.be.true;
      expect(response.body).to.be.an('array');
    });
  });

  it('Post itinterary controller goes wrong', () => {
    const httpRequest = {};
    return postItineraryController(httpRequest).catch(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response.statusCode === 400).to.be.true;
    });
  });

});
