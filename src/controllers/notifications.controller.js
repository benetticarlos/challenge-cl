import publications from '../models/publications.js';
import User from '../models/user.js';

export const getNotifications = async (req, res) => {
  const notificationsObj = req.user.notifications;
  const notificationsId = notificationsObj.map(
    (notification) => notification.id
  );

  const notifications = await publications.find({
    _id: { $in: notificationsId },
  });
  console.log('notificationsObj :>> ', notificationsObj);
  console.log('notificationsId :>> ', notificationsId);
  console.log('notifications :>> ', notifications);
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
