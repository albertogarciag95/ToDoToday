import chai from 'chai';
import spies from 'chai-spies';
import { logoutController } from '../../src/controllers';
import { logoutUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Login controller test', () => {

  chai.use(spies);
  const useCaseSpy = chai.spy(logoutUseCase);

  const fakeRequest = { cookies: { refresh_token: 'fake' } };

  it('login controller goes fine', () => {
    logoutController(fakeRequest);
    expect(useCaseSpy).to.have.been.called;
  });

});
