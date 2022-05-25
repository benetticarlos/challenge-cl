import publications from '../models/publications.js';

export const getNotifications = async (req, res) => {
  const notifications = await publications.find();
  res.json(notifications);
};

export const createNotification = async (req, res) => {
  const { title, description, date, hour, read, tags } = req.body;
  const newNotification = new publications({
    title,
    description,
    date,
    hour,
    read,
    tags,
  });
  await newNotification.save();
  res.json({ status: 'publications saved' });
};

export const updateNotification = async (req, res) => {
  const { id } = req.params;
  await publications.findByIdAndUpdate(id, {
    read: true,
  });

  res.json({ status: 'publications read' });
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  await publications.findByIdAndDelete(id);
  res.json({ status: 'publications deleted' });
};
