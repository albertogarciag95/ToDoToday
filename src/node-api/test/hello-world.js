import chai from 'chai';
const { expect } = chai;

describe('This is our first test suite', function() {

  it('should number 1 equals to 1', function() {
    expect(1).to.be.a('number');
  });

});
