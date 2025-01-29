import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/booksearchengine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;