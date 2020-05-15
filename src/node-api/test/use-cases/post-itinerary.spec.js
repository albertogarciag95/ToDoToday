import chai from 'chai';
import spies from 'chai-spies';
import db from '../../src/adapters/data-access';

import { postItineraryUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Post itinerary use-case test', function() {

  chai.use(spies);
  const dbSpy = chai.spy(db.queryPlaces);

  it('postItineraryUseCase goes wrong, body expected', () => {
    postItineraryUseCase().catch(error => {
      expect(error).to.be.an('error');
      expect(error).to.have.property('message');
      expect(error.message).to.be.a('string', 'body is required')
    });
  });

  it('postItineraryUseCase one category', () => {
    const body = { category: 'Cultura y sociedad', userLocation: { latitude: 30, longitude: -3 } };
    postItineraryUseCase(body).then(response => {
      expect(dbSpy).to.have.been.called;
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('firstPlace');
    });
  });

  it('postItineraryUseCase no category', () => {
    postItineraryUseCase({ body: {}}).catch(error => {
      expect(error).to.be.an('error');
      expect(error).to.have.property('message');
      expect(error.message).to.be.a('string', 'category body field is required')
    });
  })

  it('postItineraryUseCase all categories', () => {
    postItineraryUseCase({
        category: 'Cultura y sociedad',
        userLocation: { latitude: 30, longitude: -3 },
        secondCategory: 'Música',
        lunchCategory: 'Burguer',
        dinnerCategory: 'Healthy'
      }).then(response => {
        expect(dbSpy).to.have.been.called;
        expect(response).to.be.an('array');
        expect(response[0]).to.have.property('firstPlace');
      });
  });

});
