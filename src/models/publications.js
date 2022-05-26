import mongoose from 'mongoose';

const { Schema } = mongoose;
const date = new Date();
const PublicationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: {
      type: String,
      default: 'everybody',
    },
  },
  {
    timestamps: true,
  }
);

const Publication = mongoose.model('Publication', PublicationSchema);

export default Publication;
