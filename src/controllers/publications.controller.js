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

  for (let i = 0; i < notificationsObj.length; i++) {
    const element = notificationsObj[i];

    notifications[i].read = element.read;
  }

  // notificationsObj.forEach((notificationObj) => {
  //   notifications.read = notificationObj.read;
  // });

  // const notifRead = notificationsObj.map((notification) => notification.read);
  // console.log('notificationsId :>> ', notificationsId);

  // const notifications = await publications.find({
  //   _id: { $in: notificationsId },
  // });

  // const data = notificationsId.map(async (notif) => {
  //   const notification = await publications.findById(notif);
  //   console.log('notification :>> ', notification);
  //   data.push(notification);
  // });
  // console.log('data :>> ', await data);
  // await res.render('pages/publications', { publications: await data });

  // const notifications = await publications.findByIdAndUpdate(
  //   {
  //     _id: { $in: notificationsObj.map((notification) => notification.id) },
  //   },
  //   {
  //     $set: { read: notificationsObj.map((notification) => notification.read) },
  //   }
  // );
  console.log('notificationsObj :>> ', notificationsObj);

  console.log('notifications :>> ', notifications);
  const notificationsRev = notifications.slice().reverse();

  res.render('pages/notifications', { notifications: notificationsRev });
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
  console.log('newNotification :>> ', newNotification);
  await newNotification.save();
  res.redirect('/publications');
};

export const updateNotification = async (req, res) => {
  const { id } = req.params;
  const idUser = req.user.id;
  // await User.update(
  //   { _id: idUser, 'notifications.id': id },
  //   { 'notifications.read': true }
  // );
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
  console.log('id :>> ', id);
  console.log('idUser :>> ', idUser);
  res.redirect('/notifications');
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  await publications.findByIdAndDelete(id);
  res.redirect('/notifications');
};
