import chai from 'chai';
import spies from 'chai-spies';
import { postItineraryController } from '../../src/controllers';
import { postItineraryUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Post itinerary controller test', () => {

  chai.use(spies);
  const useCaseSpy = chai.spy(postItineraryUseCase);
  const fakeRequest = { body: {
    date: new Date(),
    category: {
      selected: 'Cultura y sociedad', price: undefined
    },
    secondCategory: {
      selected: 'Música en directo', price: undefined
    },
    lunchCategory: {
      selected: 'Burguer', price: undefined
    },
    dinnerCategory: {
      selected: 'Pizza', price: undefined
    },
    userLocation: { latitude: 30, longitude: -3 }
  }}

  it('Post itinterary controller goes fine', () => {
    postItineraryController(fakeRequest);
    expect(useCaseSpy).to.have.been.called;
  });

  it('Post itinterary controller goes wrong', () => {
    const httpRequest = {};
    postItineraryController(httpRequest).catch(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response.statusCode === 400).to.be.true;
    });
  });

});
