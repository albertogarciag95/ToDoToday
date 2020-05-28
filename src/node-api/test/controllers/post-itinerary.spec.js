import chai from 'chai';
import spies from 'chai-spies';
import { postItineraryController } from '../../src/controllers';
import { postItineraryUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Post itinerary controller test', () => {

  chai.use(spies);
  const useCaseSpy = chai.spy(postItineraryUseCase);
  const fakeRequest = { body: {
    category: {
      selected: 'Cultura y sociedad', price: undefined
    },
    secondCategory: {
      selected: 'Ocio y entretenimiento', price: undefined
    },
    lunchCategory: {
      selected: 'Burguer', price: undefined
    },
    dinnerCategory: {
      selected: 'Cocinas del mundo', price: undefined
    },
    userLocation: { latitude: 30, longitude: -3 }
  }}

  it('Post itinterary controller goes fine', () => {
    postItineraryController(fakeRequest).then(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response.statusCode === 201).to.be.true;
      expect(response.body).to.be.an('array');
    });
  });

  it('Post itinterary controller goes wrong', () => {
    const httpRequest = {};
    postItineraryController(httpRequest).catch(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response.statusCode === 400).to.be.true;
    });
  });

});
