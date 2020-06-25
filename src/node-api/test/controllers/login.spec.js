import chai from 'chai';
import spies from 'chai-spies';
import { loginController } from '../../src/controllers';
import { loginUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Login controller test', () => {

  chai.use(spies);
  const useCaseSpy = chai.spy(loginUseCase);

  const fakeRequest = { body: { userName: 'albertogarciag', password: 'Alberto1' }};

  it('login controller goes fine', () => {
    loginController(fakeRequest);
    expect(useCaseSpy).to.have.been.called;
  });

});
