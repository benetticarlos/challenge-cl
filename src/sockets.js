import Publication from './models/publications.js';
import { getNotifications } from './controllers/notifications.controller.js';
// import addNotifications from '../../helpers/subscriptions.js';
import addNotifications from './helpers/subscriptions.js';
import isAuthenticated from './helpers/auth.js';
import User from './models/user.js';

export default (io) => {
  io.on('connection', (socket) => {
    console.log('New user connected', socket.id);
    const getPublications = async () => {
      const publications = await Publication.find();
      const publicationsRev = publications.slice().reverse();
      socket.emit('server:publications', publicationsRev);
    };
    getPublications();

    socket.on('client:newpublication', async (data) => {
      const newNotification = new Publication({
        title: data.title,
        description: data.description,
        tags: data.tags,
      });
      const savedNotif = await newNotification.save();

      socket.emit('server:newpublication', savedNotif);
    });

    socket.on('user:connected', (data) => {});

    // client notif
    socket.on('client:notifications', async () => {
      if (global.user) {
        const user = await User.findById(global.user._id);

        const notificationsObj = await user.notifications;
        const notificationsId = notificationsObj.map(
          (notification) => notification.id
        );

        const notifications = await Publication.find({
          _id: { $in: notificationsId },
        });

        let finalArr = [];
        for (let i = 0; i < notificationsObj.length; i++) {
          const element = notificationsObj[i];

          const finalResult = {
            ...notifications[i]._doc,
            read: element.read,
          };
          finalArr.push(finalResult);
        }

        const notificationsRev = finalArr.slice().reverse();
        socket.emit('server:notifications', notificationsRev);
      }
    });

    socket.on('client:profileTeam', async (data) => {
      const id = global.user.id;
      const user = await User.findById(id);
      const notifications = await Publication.find({
        tags: data.subscriptions,
      });
      const notificationsID = notifications.map((notification) => {
        return { id: notification._id };
      });
      console.log('user ANTES DEL FINDBYID :>> ', user);
      const userChange = await User.findByIdAndUpdate(id, {
        subscriptions: data.subscriptions,
        notifications: notificationsID,
      });
      console.log('user DESPUES DEL FINDBYID :>> ', await userChange);
    });
  });
};
