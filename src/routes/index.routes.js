import express from 'express';
const router = express.Router();
import Notification from '../models/notification.js';

router.get('/', async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
});

router.post('/', async (req, res) => {
  const { title, description, date, hour, read, tags } = req.body;
  const newNotification = new Notification({
    title,
    description,
    date,
    hour,
    read,
    tags,
  });
  await newNotification.save();
  res.json({ status: 'Notification saved' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await Notification.findByIdAndUpdate(id, {
    read: true,
  });

  res.json({ status: 'Notification read' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Notification.findByIdAndDelete(id);
  res.json({ status: 'Notification deleted' });
});

export default router;
