import mongoose from 'mongoose';
import config from './config/config.js';

const { MONGO_DB, MONGO_DB_TEST, MONGO_DB_LOCAL, NODE_ENV } = process.env;

const URI = NODE_ENV === 'test' ? MONGO_DB_TEST : MONGO_DB || MONGO_DB_LOCAL;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.error(err));

export default mongoose;
