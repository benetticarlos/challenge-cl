import publications from '../models/publications.js';
import User from '../models/user.js';
import addNotifications from '../helpers/subscriptions.js';

export const getNotifications = async (req, res) => {
  // await addNotifications(req.user);
  const notificationsObj = req.user.notifications;
  const notificationsId = notificationsObj.map(
    (notification) => notification.id
  );

  const notifications = await publications.find({
    _id: { $in: notificationsId },
  });

  for (let i = 0; i < notificationsObj.length; i++) {
    const element = notificationsObj[i];

    notifications[i].read = element.read;
  }

  const notificationsRev = notifications.slice().reverse();

  res.render('pages/notifications', { notifications: notificationsRev });
};

export const updateNotification = async (req, res) => {
  const { id } = req.params;
  const idUser = req.user.id;

  await User.updateOne(
    {
      _id: idUser,
      'notifications.id': id,
    },

    {
      $set: {
        'notifications.$.read': true,
      },
    }
  );
  res.redirect('/notifications');
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  const idUser = req.user.id;
  await User.updateOne(
    {
      _id: idUser,
      'notifications.id': id,
    },

    {
      $pull: {
        notifications: {
          id,
        },
      },
    }
  );
  res.redirect('/notifications');
};
