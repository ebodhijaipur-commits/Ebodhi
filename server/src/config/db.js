import mongoose from 'mongoose';

let lastError = null;

export function getDbStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return {
    readyState: mongoose.connection.readyState,
    stateName: states[mongoose.connection.readyState] || 'unknown',
    uriConfigured: Boolean(process.env.MONGO_URI),
    lastError: lastError ? String(lastError.message || lastError) : null,
  };
}

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ebodhi';
  mongoose.set('bufferTimeoutMS', 8000);
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected');
  } catch (err) {
    lastError = err;
    console.error('MongoDB connection failed:', err.message);
    console.error('Start MongoDB locally or set MONGO_URI in server/.env');
  }
}
