import mongoose from 'mongoose';

const { Schema } = mongoose;
const date = new Date();
const PublicationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    // read: { type: Boolean, default: false },
    tags:
      // {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Tags',
      // },
      {
        type: String,
        default: 'everybody',
      },

    // users: [{}],
  },
  {
    timestamps: true,
  }
);

const Publication = mongoose.model('Publication', PublicationSchema);

export default Publication;
