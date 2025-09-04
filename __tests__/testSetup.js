const { MongoMemoryServer } = require('mongodb-memory-server');
const { mongoose } = require('../src/server');
const logger = require('../src/utils/logger');

// Disable logging during tests
logger.transports.forEach(t => (t.silent = true));

let mongoServer;

beforeAll(async () => {
  // Close any existing connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongoServer.stop();
});

afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  }
});
