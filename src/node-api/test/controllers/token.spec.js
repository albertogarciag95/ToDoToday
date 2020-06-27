import chai from 'chai';
import spies from 'chai-spies';

import { tokenController } from '../../src/controllers';
import { tokenUseCase } from '../../src/use-cases';
import makeTokenController from '../../src/controllers/token';

const expect = chai.expect;

describe('token controller test', function() {

  chai.use(spies);
  const tokenUseCaseSpy = chai.spy(tokenUseCase);

  it('token controller goes fine', () => {
    const httpRequest = { cookies: { refresh_token: 'test' }};

    tokenController(httpRequest).then(response => {
      expect(tokenUseCaseSpy).to.have.been.called;
      expect(response.statusCode === 401).to.be.true;
    });
  });

  it('token controller goes wrong', () => {
    const tokenController = makeTokenController({
      tokenUseCase: () => {
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

    tokenController().then(actual => {
      expect(actual).to.deep.equal(expected);
    });
  });
});
