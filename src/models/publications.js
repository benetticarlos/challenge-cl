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
    dateDay: {
      type: String,
      default: date.toLocaleDateString(),
    },
    dateTime: {
      type: String,
      default: date.toLocaleTimeString(),
    },
  },

  {
    timestamps: true,
  }
);

const Publication = mongoose.model('Publication', PublicationSchema);

export default Publication;
