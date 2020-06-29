import chai from 'chai';
import spies from 'chai-spies';

import { getUserInfoController } from '../../src/controllers';
import { getUserInfoUseCase } from '../../src/use-cases';
import makeGetUserInfoController from '../../src/controllers/get-user-info';

const expect = chai.expect;

describe('Get user info controller test', function() {

  chai.use(spies);
  const getUserInfoUseCaseSpy = chai.spy(getUserInfoUseCase);

  it('getUserInfo controller goes fine', () => {
    const httpRequest = { userName: 'albertogarciag' };
    getUserInfoController(httpRequest).then(response => {
      expect(getUserInfoUseCaseSpy).to.have.been.called;
      expect(response.statusCode === 200).to.be.true;
    });
  });

  it('startItinerary controller goes fine', () => {
    const getUserInfoController = makeGetUserInfoController({
      getUserInfoUseCase: () => {
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

    getUserInfoController().then(actual => {
      expect(actual).to.deep.equal(expected);
    });
  });
});
