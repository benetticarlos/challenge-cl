import express from 'express';
const router = express.Router();
import * as NotificationControllers from '../controllers/notifications.controller.js';
import isAuthenticated from '../helpers/auth.js';

router.get(
  '/',
  isAuthenticated,
  NotificationControllers.renderNotifications,
  NotificationControllers.getNotifications
);

router.get(
  '/edit/:id',
  isAuthenticated,
  NotificationControllers.updateNotification
);

router.get(
  '/delete/:id',
  isAuthenticated,
  NotificationControllers.deleteNotification
);

export default router;
