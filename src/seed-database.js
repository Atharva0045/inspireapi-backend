const mongoose = require('mongoose');
require('dotenv').config();

// Quote schema (same as in your backend)
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

// Sample quotes data
const quotesData = [
  // Motivation Category
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
    tags: ["work", "passion", "greatness"]
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "motivation",
    tags: ["success", "failure", "courage", "persistence"]
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "motivation",
    tags: ["persistence", "time", "dedication"]
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivation",
    tags: ["dreams", "future", "belief"]
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "motivation",
    tags: ["hope", "darkness", "light", "focus"]
  },

  // Inspiration Category
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "inspiration",
    tags: ["authenticity", "individuality", "self"]
  },
  {
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
    category: "inspiration",
    tags: ["humor", "intelligence", "universe"]
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "inspiration",
    tags: ["opportunity", "difficulty", "challenges"]
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "inspiration",
    tags: ["action", "time", "opportunity", "growth"]
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown",
    category: "inspiration",
    tags: ["limitations", "imagination", "mindset"]
  },

  // Wisdom Category
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: "wisdom",
    tags: ["knowledge", "humility", "learning"]
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "wisdom",
    tags: ["progress", "persistence", "patience"]
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: "wisdom",
    tags: ["journey", "beginning", "action"]
  },
  {
    text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
    author: "Bill Keane",
    category: "wisdom",
    tags: ["present", "time", "mindfulness"]
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "wisdom",
    tags: ["resilience", "falling", "rising", "glory"]
  },

  // Life Category
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "life",
    tags: ["life", "plans", "present", "unexpected"]
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "life",
    tags: ["happiness", "purpose", "meaning"]
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    category: "life",
    tags: ["simplicity", "complexity", "philosophy"]
  },
  {
    text: "Get busy living or get busy dying.",
    author: "Stephen King",
    category: "life",
    tags: ["living", "choice", "action"]
  },
  {
    text: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
    author: "Brian Tracy",
    category: "life",
    tags: ["strength", "inner power", "resilience"]
  },

  // Success Category
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer",
    category: "success",
    tags: ["happiness", "success", "key"]
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    category: "success",
    tags: ["greatness", "sacrifice", "ambition"]
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "success",
    tags: ["action", "execution", "beginning"]
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "success",
    tags: ["innovation", "leadership", "creativity"]
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    category: "success",
    tags: ["failure", "enthusiasm", "persistence"]
  },

  // Additional quotes for variety
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "motivation",
    tags: ["journey", "beginning", "possibility"]
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    category: "life",
    tags: ["life", "wisdom", "continuity"]
  },
  {
    text: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein",
    category: "inspiration",
    tags: ["happiness", "goals", "independence"]
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
    category: "wisdom",
    tags: ["mistakes", "innovation", "learning"]
  },
  {
    text: "The best revenge is massive success.",
    author: "Frank Sinatra",
    category: "success",
    tags: ["revenge", "success", "achievement"]
  },
  {
    text: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
    category: "motivation",
    tags: ["mindset", "belief", "self-confidence"]
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
    category: "inspiration",
    tags: ["failure", "learning", "persistence"]
  },
  {
    text: "A man who stands for nothing will fall for anything.",
    author: "Malcolm X",
    category: "wisdom",
    tags: ["principles", "values", "character"]
  },
  {
    text: "Life is 10% what happens to you and 90% how you react to it.",
    author: "Charles R. Swindoll",
    category: "life",
    tags: ["reaction", "attitude", "control"]
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    category: "success",
    tags: ["destiny", "decision", "self-determination"]
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
    category: "motivation",
    tags: ["past", "present", "focus"]
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    category: "inspiration",
    tags: ["opportunity", "action", "courage"]
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "wisdom",
    tags: ["future", "creation", "prediction"]
  },
  {
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
    category: "life",
    tags: ["self-creation", "identity", "purpose"]
  },
  {
    text: "The road to success and the road to failure are almost exactly the same.",
    author: "Colin R. Davis",
    category: "success",
    tags: ["success", "failure", "journey"]
  }
];

// Database seeding function
async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quotesapi';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing quotes (optional - comment out if you want to keep existing data)
    console.log('Clearing existing quotes...');
    await Quote.deleteMany({});
    console.log('✅ Existing quotes cleared');

    // Insert new quotes
    console.log('Inserting new quotes...');
    const insertedQuotes = await Quote.insertMany(quotesData);
    console.log(`✅ Successfully inserted ${insertedQuotes.length} quotes`);

    // Display summary
    const categoryStats = await Quote.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log('\n📊 Quote Statistics:');
    categoryStats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} quotes`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('📡 Database connection closed');
    process.exit(0);
  }
}

// Run the seeding function
if (require.main === module) {
  console.log('🌱 Starting database seeding...\n');
  seedDatabase();
}

module.exports = { seedDatabase, quotesData };