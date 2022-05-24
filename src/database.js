import mongoose from 'mongoose';
import config from './config/config.js';

const URI = config.MONGO_DB || 'mongodb://localhost/challenge-cintelink';

mongoose
  .connect(URI)
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.error(err));

export default mongoose;
