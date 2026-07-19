const mongoose = require('mongoose');

const syncUserIndexes = async () => {
  try {
    const User = require('../models/User');
    const collection = mongoose.connection.collection('users');
    const indexes = await collection.indexes();

    for (const idx of indexes) {
      if (idx.name === 'username_1' || idx.name === 'email_1') {
        await collection.dropIndex(idx.name);
        console.log(`Dropped legacy index: ${idx.name}`);
      }
    }

    // Clear any leftover documents that stored username: null explicitly
    await collection.updateMany(
      { $or: [{ username: null }, { username: '' }] },
      { $unset: { username: '' } }
    );

    await User.syncIndexes();
    console.log('User indexes synced');
  } catch (error) {
    console.error('Index sync warning:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ebodhi');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await syncUserIndexes();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
