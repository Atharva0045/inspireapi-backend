const request = require('supertest');
const { app, mongoose } = require('../src/server');
const { Quote } = require('../src/models/quote.model');

describe('Quote API Endpoints', () => {
  const sampleQuote = {
    text: 'Life is what happens while you are busy making other plans.',
    author: 'John Lennon',
    category: 'life',
    tags: ['life', 'planning']
  };

  describe('POST /api/quotes', () => {
    it('should create a new quote', async () => {
      const res = await request(app).post('/api/quotes').send(sampleQuote);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.quote.text).toBe(sampleQuote.text);
      expect(res.body.data.quote.author).toBe(sampleQuote.author);
    });

    it('should validate required fields', async () => {
      const res = await request(app).post('/api/quotes').send({
        author: 'John Doe'
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/quotes', () => {
    beforeEach(async () => {
      await Quote.create(sampleQuote);
    });

    it('should get all quotes with pagination', async () => {
      const res = await request(app).get('/api/quotes');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.quotes)).toBe(true);
      expect(res.body.data.quotes.length).toBeGreaterThan(0);
      expect(res.body.data.pagination).toBeDefined();
    });

    it('should filter quotes by category', async () => {
      const res = await request(app)
        .get('/api/quotes')
        .query({ category: 'life' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.quotes.every(q => q.category === 'life')).toBe(true);
    });
  });

  describe('GET /api/quotes/random', () => {
    beforeEach(async () => {
      await Quote.create(sampleQuote);
    });

    it('should get a random quote', async () => {
      const res = await request(app).get('/api/quotes/random');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.quote.text).toBeDefined();
      expect(res.body.data.quote.author).toBeDefined();
    });

    it('should get a random quote by category', async () => {
      const res = await request(app)
        .get('/api/quotes/random')
        .query({ category: 'life' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.quote.category).toBe('life');
    });
  });

  describe('GET /api/quotes/:id', () => {
    let quoteId;

    beforeEach(async () => {
      const quote = await Quote.create(sampleQuote);
      quoteId = quote._id;
    });

    it('should get a quote by id', async () => {
      const res = await request(app).get(`/api/quotes/${quoteId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.quote._id).toBe(quoteId.toString());
    });

    it('should return 404 for non-existent quote', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/quotes/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
