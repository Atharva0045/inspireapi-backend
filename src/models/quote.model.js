const mongoose = require('mongoose');
const Joi = require('joi');

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  category: {
    type: String,
    enum: ['motivation', 'inspiration', 'wisdom', 'life', 'success'],
    default: 'inspiration'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
quoteSchema.index({ category: 1, isActive: 1 });
quoteSchema.index({ author: 1 });

const Quote = mongoose.model('Quote', quoteSchema);

// Validation schema
const validateQuote = (quote) => {
  const schema = Joi.object({
    text: Joi.string().min(10).max(500).required(),
    author: Joi.string().min(2).max(100).required(),
    category: Joi.string().valid('motivation', 'inspiration', 'wisdom', 'life', 'success'),
    tags: Joi.array().items(Joi.string().max(50))
  });
  return schema.validate(quote);
};

module.exports = { Quote, validateQuote };
