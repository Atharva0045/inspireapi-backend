const express = require('express');
const quotesController = require('../controllers/quote.controller');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

// GET /api/quotes - Get all quotes with pagination
router.get('/', quotesController.getAllQuotes);

// GET /api/quotes/random - Get random quote
router.get('/random', quotesController.getRandomQuote);

// GET /api/quotes/categories - Get categories
router.get('/categories', quotesController.getCategories);

// GET /api/quotes/:id - Get quote by ID
router.get('/:id', validateObjectId, quotesController.getQuoteById);

// POST /api/quotes - Create new quote
router.post('/', quotesController.createQuote);

module.exports = router;
