const { empty, isValidCard } = require('../helpers/validations');
const { errorMessage, status } = require('../helpers/status');
const cardsService = require('../services/cardsService');

const cardsController = {
  addCard: async (req, res) => {
    const { customerName, cardNumber, limit } = req.body;
    if (empty(customerName) || empty(cardNumber) || empty(limit)) {
      errorMessage.error = 'Customer Name, Card Number & Card limit fields cannot be empty';
      return res.status(status.bad).send(errorMessage);
    }

    if (!isValidCard(cardNumber)) {
      errorMessage.error = 'Please Enter a Valid Card Number';
      return res.status(status.bad).send(errorMessage);
    }

    try {
      const card = await cardsService.addCard({ customerName, cardNumber, limit });
      return res.status(status.created).send(card);
    } catch (error) {
      console.log(error.code);
      let errStatus;
      if (error.code === 'P2002') {
        errorMessage.error = error.message;
        errStatus = status.conflict;
      } else {
        errorMessage.error = 'Server Error: Something gone wrong while adding the new card into system';
        errStatus = status.error;
      }
      return res.status(errStatus).send(errorMessage);
    }
  },
  getAllCards: async (req, res) => {
    try {
      const allCards = await cardsService.getAllCards();
      return res.status(status.success).send(allCards);
    } catch (error) {
      errorMessage.error = 'Server Error: Something gone wrong while fetching list of stored cards';
      return res.status(status.error).send(errorMessage);
    }
  }
};

module.exports = cardsController;
