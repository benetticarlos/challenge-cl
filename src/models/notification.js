import mongoose from 'mongoose';

const { Schema } = mongoose;
const date = new Date();
const NotificationSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, default: date.toLocaleDateString() },
  hour: { type: String, default: date.toLocaleTimeString() },
  read: { type: Boolean, default: false },
  tags: [String],
});

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
