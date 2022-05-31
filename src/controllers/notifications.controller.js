import User from '../models/user.js';

export const renderNotifications = async (req, res, next) => {
  res.render('pages/notifications');
  return next();
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
