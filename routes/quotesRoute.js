const express = require('express');
const { getQuotes, addQuote, getSpecificQuote, deleteQuote, updateQuote, getRandomQuote } = require('../controllers/quotesController')
const router = express.Router();

router.get('/get-quotes', getQuotes);
router.post('/add-quote', addQuote);
router.get('/get-specific-quote/:quote_id', getSpecificQuote);
router.get('/get-random-quote', getRandomQuote);
router.delete('/delete-quote/:quote_id', deleteQuote);
router.put('/update-quote/:quote_id', updateQuote);


module.exports = router;