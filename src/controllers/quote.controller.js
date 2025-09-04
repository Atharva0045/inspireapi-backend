const { Quote, validateQuote } = require('../models/quote.model');
const logger = require('../utils/logger');

class QuotesController {
  // Get all quotes with pagination and filtering
  async getAllQuotes(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const category = req.query.category;
      const author = req.query.author;

      const filter = { isActive: true };
      if (category) filter.category = category;
      if (author) filter.author = new RegExp(author, 'i');

      const quotes = await Quote.find(filter)
        .select('-__v')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Quote.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: {
          quotes,
          pagination: {
            current: page,
            total: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
          }
        }
      });
    } catch (error) {
      logger.error('Error fetching quotes:', error);
      next(error);
    }
  }

  // Get random quote
  async getRandomQuote(req, res, next) {
    try {
      const category = req.query.category;
      const filter = { isActive: true };
      if (category) filter.category = category;

      const count = await Quote.countDocuments(filter);
      const random = Math.floor(Math.random() * count);
      const quote = await Quote.findOne(filter).skip(random).select('-__v');

      if (!quote) {
        return res.status(404).json({
          success: false,
          message: 'No quotes found'
        });
      }

      res.status(200).json({
        success: true,
        data: { quote }
      });
    } catch (error) {
      logger.error('Error fetching random quote:', error);
      next(error);
    }
  }

  // Get quote by ID
  async getQuoteById(req, res, next) {
    try {
      const quote = await Quote.findById(req.params.id).select('-__v');
      
      if (!quote) {
        return res.status(404).json({
          success: false,
          message: 'Quote not found'
        });
      }

      res.status(200).json({
        success: true,
        data: { quote }
      });
    } catch (error) {
      logger.error('Error fetching quote by ID:', error);
      next(error);
    }
  }

  // Create new quote
  async createQuote(req, res, next) {
    try {
      const { error } = validateQuote(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }

      const quote = new Quote(req.body);
      await quote.save();

      res.status(201).json({
        success: true,
        data: { quote },
        message: 'Quote created successfully'
      });
    } catch (error) {
      logger.error('Error creating quote:', error);
      next(error);
    }
  }

  // Get categories with count
  async getCategories(req, res, next) {
    try {
      const categories = await Quote.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      res.status(200).json({
        success: true,
        data: { categories }
      });
    } catch (error) {
      logger.error('Error fetching categories:', error);
      next(error);
    }
  }
}

module.exports = new QuotesController();
