import makePlace from '../../src/entities/place';
import chai from 'chai';

const expect = chai.expect;

describe('place entity', () => {

  const fakeString = 'test';
  const fakeNumber = 39.9;

  it('must have a title', () => {
    expect(() => makePlace({})).throw('Place must have a title or is invalid')
  })

  it('title is too long', () => {
    expect(() => makePlace({ title: 'testtesttesttesttesttesttesttesttesttettesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttest' }))
      .throw('Place must have a title or is invalid')
  })

  it('must have a description', () => {
    expect(() => makePlace({ title: 'test' }))
      .throw(`Place ${fakeString} must have a description.`);
  })

  it('must have category', () => {
    expect(() => makePlace({ title: fakeString, description: fakeString, category: null }))
      .throw(`Place ${fakeString} category is invalid or null.`);
  })

  it('must have latitude', () => {
    expect(() => makePlace({ title: fakeString, description: fakeString, category: null }))
      .throw(`Place ${fakeString} category is invalid or null.`);
  })

  it('must have latitude', () => {
    expect(() => makePlace({ title: fakeString, description: fakeString, category: fakeString, latitude: "wrong" }))
      .throw(`Place ${fakeString} must have latitude`);

    expect(() => makePlace({ title: fakeString, description: fakeString, category: fakeString }))
      .throw(`Place ${fakeString} must have latitude`);
  })

  it('must have location', () => {
    expect(() => makePlace({ title: fakeString, description: fakeString, category: fakeString, latitude: fakeNumber }))
      .throw(`Place ${fakeString} must have location`);
  })

  it('must have longitude', () => {
    expect(() => makePlace({ title: fakeString, description: fakeString, category: fakeString, latitude: fakeNumber, location: fakeNumber, longitude: "wrong" }))
      .throw(`Place ${fakeString} must have longitude`);

    expect(() => makePlace({ title: fakeString, description: fakeString, category: fakeString, latitude: fakeNumber, location: fakeNumber }))
      .throw(`Place ${fakeString} must have longitude`);
  })

  it('good place', () => {
    const place = { title: fakeString, description: fakeString, category: fakeString, latitude: fakeNumber, location: fakeNumber, longitude: fakeNumber, price_per_person: 0 };
    const makeGoodPlace = makePlace(place);
    makeGoodPlace.getDescription();
    makeGoodPlace.getCategory();
    makeGoodPlace.getDateEnd();
    makeGoodPlace.getDateStart();
    makeGoodPlace.getLatitude();
    makeGoodPlace.getLongitude();
    makeGoodPlace.getLocation();
    makeGoodPlace.getPrice();
    makeGoodPlace.getLocation();
    expect(makeGoodPlace.isFree()).to.be.true;

    expect(makeGoodPlace).to.be.an('object');
  })

})
