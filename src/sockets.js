import Publication from './models/publications.js';
import User from './models/user.js';

export default (io) => {
  // Socket.io
  io.on('connection', (socket) => {
    // Get all publications
    const getPublications = async () => {
      const publications = await Publication.find();
      const publicationsRev = publications.slice().reverse();
      socket.emit('server:publications', publicationsRev);
    };
    getPublications();

    // Listen to new publications
    socket.on('client:newpublication', async (data) => {
      const newNotification = new Publication({
        title: data.title,
        description: data.description,
        tags: data.tags,
      });
      const savedNotif = await newNotification.save();

      // Send to all users
      socket.emit('server:newpublication', savedNotif);

      // Send to users subscribed to the tags
      const usersWithTag = await User.find({
        subscriptions: { $in: data.tags },
      });

      usersWithTag.forEach(async (user) => {
        await User.updateOne(
          {
            _id: user.id,
          },
          {
            $push: {
              notifications: {
                id: savedNotif.id,
                read: false,
              },
            },
          }
        );
      });
    });

    // socket.on('user:connected', (data) => {});

    // Listen to notifications
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

        // Send notifications to client
        socket.emit('server:notifications', notificationsRev);
      }
    });

    // Listen change subscription
    socket.on('client:profileTeam', async (data) => {
      const id = global.user.id;
      await User.findById(id);
      const notifications = await Publication.find({
        tags: data.subscriptions,
      });
      const notificationsID = notifications.map((notification) => {
        return { id: notification._id };
      });
      await User.findByIdAndUpdate(id, {
        subscriptions: data.subscriptions,
        notifications: notificationsID,
      });
    });
  });
};
