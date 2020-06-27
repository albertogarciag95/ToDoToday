import chai from 'chai';
import spies from 'chai-spies';

import { startItineraryController } from '../../src/controllers';
import { startItineraryUseCase } from '../../src/use-cases';
import { saveUserItineraryUseCase } from '../../src/use-cases';
import makeStartItineraryController from '../../src/controllers/start-itinerary';

const expect = chai.expect;

describe('Start itinerary controller test', function() {

  chai.use(spies);
  const startItineraryUseCaseSpy = chai.spy(startItineraryUseCase);
  const saveUserItineraryUseCaseSpy = chai.spy(saveUserItineraryUseCase);

  it('startItinerary controller goes fine', () => {
    const httpRequest = {
      body: {
        places: [{
          title: 'Jardines del buen retiro',
          description: 'test',
          category: 'test',
          latitude: 1,
          longitude: 1,
          location: 'test'
        }],
        totalDistance: 2,
        totalPrice: 2,
        startPoint: 'Test',
        startDate: new Date()
      },
      user: { userName: 'Test' }
    }
    startItineraryController(httpRequest).then(response => {
      expect(startItineraryUseCaseSpy).to.have.been.called;
      expect(saveUserItineraryUseCaseSpy).to.have.been.called;
      expect(response.statusCode === 201).to.be.true;
    });
  });

  it('startItinerary controller goes fine', () => {
    const startItineraryController = makeStartItineraryController({
      startItineraryUseCase: () => {
        throw new AppError('Pow!', 400);
      }
    }, null);
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: 'Pow!'
    }

    startItineraryController().then(actual => {
      expect(actual).to.deep.equal(expected);
    });
  });
});
