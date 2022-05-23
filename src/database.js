import mongoose from 'mongoose';

const URI =
  proccess.env.MONGODB_URI || 'mongodb://localhost/challenge-cintelink';

mongoose
  .connect(URI)
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.error(err));

export default mongoose;
