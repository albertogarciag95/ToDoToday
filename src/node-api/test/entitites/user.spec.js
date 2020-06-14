import makeUser from '../../src/entities/user';
import chai from 'chai';

const expect = chai.expect;

describe('place entity', () => {

  const fakeDate = new Date(new Date().setDate(new Date().getDate() - 3));

  it('must have username', () => {
    expect(() => makeUser({ name: 'test' }))
      .throw(`User test must have a userName.`);
  });

  it('must have birthdate', () => {
    expect(() => makeUser({ name: 'test', userName: 'test' }))
      .throw(`User test must have a birthdate or is invalid`);
  });

  it('birthdate is invalid', () => {
    expect(() => makeUser({ name: 'test', userName: 'test', birthDate: new Date(new Date().setDate(new Date().getDate() + 3)) }))
      .throw(`User test must have a birthdate or is invalid`);
  });

  it('must have email', () => {
    expect(() => makeUser({ name: 'test', userName: 'test', birthDate: fakeDate }))
      .throw(`User test must have email or is invalid`);
  });

  it('email is invalid', () => {
    expect(() => makeUser({
      name: 'test',
      userName: 'test',
      birthDate: fakeDate,
      email: 'test'
    }))
      .throw(`User test must have email or is invalid`);
  });

  it('must have password', () => {
    expect(() => makeUser({
      name: 'test',
      userName: 'test',
      birthDate: fakeDate,
      email: 'test@test.com'
    }))
      .throw(`User test must have password`);
  });

  it('good user', () => {
    const place = { name: 'test', userName: 'test', email: 'test@test.com', birthDate: fakeDate, email: 'test@test.com', password: 'testTest1' };
    const user = makeUser(place);
    user.getName();
    user.getUserName();
    user.getBirthDate();
    user.getEmail();
    user.getPassword();

    expect(user).to.be.an('object');
  })
});
