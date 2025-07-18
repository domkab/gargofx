import mongoose from 'mongoose';

let initialized = false;
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME;

if (!uri || !dbName) {
  throw new Error('MongoDB URI or DB name is not defined in the environment variables');
};

export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (!uri) {
    throw new Error('MongoDB URI is not defined in the environment variables');
  }

  if (initialized) {
    console.log('already connected to MongoDB');

    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: dbName,
    });

    console.log('Connected to MongoDb')
    initialized = true;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Database connection error: ${error}`);
    } else {
      throw new Error(`Database connection error: ${String(error)}`);
    }
  }
}