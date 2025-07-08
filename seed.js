// Convert mock data into MongoDB seed data
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User.js');
const Profile = require('./models/Profile.js');
const MatchmakingAction = require('./models/MatchmakingAction.js');

// Load mock data
const users = require('./mock-data/users.json');
const profiles = require('./mock-data/profiles.json');
const actions = require('./mock-data/matchmakingActions.json');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear collections
    await User.deleteMany();
    await Profile.deleteMany();
    await MatchmakingAction.deleteMany();

    // Insert data
    await User.insertMany(users);
    await Profile.insertMany(profiles);
    await MatchmakingAction.insertMany(actions);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
