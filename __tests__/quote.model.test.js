const { validateQuote } = require('../src/models/quote.model');

describe('Quote Model Validation', () => {
  it('should validate a valid quote', () => {
    const validQuote = {
      text: 'This is a valid quote text that meets the minimum length requirement',
      author: 'John Doe',
      category: 'wisdom',
      tags: ['wisdom', 'life']
    };

    const { error } = validateQuote(validQuote);
    expect(error).toBeUndefined();
  });

  it('should invalidate quote with short text', () => {
    const invalidQuote = {
      text: 'Short',
      author: 'John Doe',
      category: 'wisdom'
    };

    const { error } = validateQuote(invalidQuote);
    expect(error).toBeDefined();
    expect(error.details[0].path[0]).toBe('text');
  });

  it('should invalidate quote with invalid category', () => {
    const invalidQuote = {
      text: 'This is a valid quote text that meets the minimum length requirement',
      author: 'John Doe',
      category: 'invalid-category'
    };

    const { error } = validateQuote(invalidQuote);
    expect(error).toBeDefined();
    expect(error.details[0].path[0]).toBe('category');
  });

  it('should validate quote without optional fields', () => {
    const validQuote = {
      text: 'This is a valid quote text that meets the minimum length requirement',
      author: 'John Doe'
    };

    const { error } = validateQuote(validQuote);
    expect(error).toBeUndefined();
  });
});
