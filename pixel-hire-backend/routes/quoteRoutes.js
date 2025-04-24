const express = require('express');
const { sendQuote, getQuotesForRequest } = require('../controllers/quoteController');
const { protect } = require('../middlewares/authMiddleware');
const { onlyCreators, onlyClients } = require('../middlewares/roleCheck');
const { deleteQuote } = require('../controllers/quoteController');



const router = express.Router();

router.post('/', protect, onlyCreators, sendQuote); // Creator sends quote
router.get('/:requestId', protect, onlyClients, getQuotesForRequest); // Client views quotes
router.delete('/:quoteId', protect, onlyCreators, deleteQuote);

module.exports = router;
