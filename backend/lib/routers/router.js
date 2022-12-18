const express = require('express');
const { addCard, getAllCards } = require('../controllers/cardsController');

const router = express.Router();

// Cards Routes
router.post('/card', addCard);
router.get('/cards', getAllCards);

module.exports = router;
