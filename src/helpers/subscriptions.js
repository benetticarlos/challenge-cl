import User from '../models/user.js';
import Publication from '../models/publications.js';

const addNotifications = async (user) => {
  const notifications = await Publication.find({ tags: user.subscriptions });
  const notificationsID = notifications.map((notification) => {
    return { id: notification._id };
  });

  await User.findByIdAndUpdate(user._id, {
    notifications: notificationsID,
  });
};

export default addNotifications;
