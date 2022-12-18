
const sinon = require('sinon');
const cardsController = require('./cardsController');
const cardsService = require('../services/cardsService');

describe('cardsController', () => {
  let cardsServiceStub;

  it('should throw a bad request when customer name is empty', async () => {
    const req = {
      body: {
        customerName: '',
        cardNumber: '4809344282531711',
        limit: 100
      }
    };
    const res = {
      status: sinon.stub().returns({ end: sinon.spy(), send: sinon.mock() })
    };

    await cardsController.addCard(req, res);
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledOnce(res.status(400).send);
  });

  it('should throw a bad request when card number is invalid', async () => {
    const req = {
      body: {
        customerName: 'John Doe',
        cardNumber: '123456789012345',
        limit: 100
      }
    };
    const res = {
      status: sinon.stub().returns({ end: sinon.spy(), send: sinon.mock() })
    };
    await cardsController.addCard(req, res);
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledOnce(res.status(400).send);
  });

  it('should return a 201 response when all the details are valid', async () => {
    const req = {
      body: {
        customerName: 'John Doe',
        cardNumber: '4809344282531711',
        limit: 100
      }
    };
    const res = {
      status: sinon.stub().returns({ end: sinon.spy(), send: sinon.mock() })
    };
    cardsServiceStub = sinon.stub(cardsService, 'addCard').returns(null);
    await cardsController.addCard(req, res);
    sinon.assert.calledWithExactly(cardsServiceStub, req.body);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledOnce(res.status(201).send);
    cardsService.addCard.restore();
  });

  it('should return a 500 response when the cardsService fails', async () => {
    const req = {
      body: {
        customerName: 'John Doe',
        cardNumber: '4809344282531711',
        limit: 100
      }
    };
    const res = {
      status: sinon.stub().returns({ end: sinon.spy(), send: sinon.mock() })
    };
    const error = {
      code: 'P2002'
    };
    cardsServiceStub = sinon.stub(cardsService, 'addCard').throws(error);
    await cardsController.addCard(req, res);
    sinon.assert.calledWithExactly(cardsServiceStub, req.body);
    sinon.assert.calledWith(res.status, 409);
    sinon.assert.calledOnce(res.status(409).send);
  });
});
