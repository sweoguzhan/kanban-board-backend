// routes/categoryRoutes.js
const express = require('express');
const {createCard, getCards, updateCard, deleteCard,getCard, getCardByCategory} = require('../controllers/cardController');

const router = express.Router();

router.post('/', createCard);
router.get('/', getCards);
router.get('/:id', getCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);


module.exports = router;

