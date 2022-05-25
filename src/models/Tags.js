import mongoose from 'mongoose';

const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Tags = mongoose.model('Tags', TagSchema);

export default Tags;
