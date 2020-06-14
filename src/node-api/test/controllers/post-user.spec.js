import chai from 'chai';
import spies from 'chai-spies';
import { postUserController } from '../../src/controllers';
import { postUserUseCase } from '../../src/use-cases';

const expect = chai.expect;

describe('Post user controller test', () => {

  chai.use(spies);
  const useCaseSpy = chai.spy(postUserUseCase);
  const fakeRequest = { body: {
    name: 'Test',
    userName: 'Test',
    email: 'test@test.com',
    birthDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    password: 'TestTest1'
  }};


  it('Post user controller goes fine', () => {
    postUserController(fakeRequest);
    expect(useCaseSpy).to.have.been.called;
  });

  it('Post user controller goes wrong', () => {
    const httpRequest = {};
    postUserController(httpRequest).catch(response => {
      expect(useCaseSpy).to.have.been.called;
      expect(response.statusCode === 400).to.be.true;
    });
  });

});
