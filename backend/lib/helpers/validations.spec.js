const { expect } = require('chai');
const { isValidCard, empty } = require('./validations');

describe('/helpers/validations', () => {
  it('Should return true when passed valid credit card number as input', (done) => {
    const validCreditCardNumber = '4809344282531711';

    expect(isValidCard(validCreditCardNumber)).to.be.true;
    done();
  });

  it('Should return false when passed Invalid credit card number with 16 digit length as input', (done) => {
    const invalidCardNumber = '1234567890123456';
    expect(isValidCard(invalidCardNumber)).to.be.false;
    done();
  });

  it('Should return false when passed Invalid credit card number as input', (done) => {
    const invalidCardNumber = '12345678';
    expect(isValidCard(invalidCardNumber)).to.be.false;
    done();
  });

  it('Should return true when passed Empty value as input', (done) => {
    const emptyValue = '';
    expect(empty(emptyValue)).to.be.true;
    done();
  });

  it('Should return true when passed undefined value as input', (done) => {
    const emptyValue = undefined;
    expect(empty(emptyValue)).to.be.true;
    done();
  });

  it('Should return false when passed truthy value as input', (done) => {
    const emptyValue = 'Some input';
    expect(empty(emptyValue)).to.be.false;
    done();
  });
});
