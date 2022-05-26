import express from 'express';
const router = express.Router();
import * as NotificationControllers from '../controllers/notifications.controller.js';
import helpers from '../helpers/auth.js';

router.get(
  '/',
  helpers.isAuthenticated,
  NotificationControllers.getNotifications
);

router.get(
  '/edit/:id',
  helpers.isAuthenticated,
  NotificationControllers.updateNotification
);

router.get(
  '/delete/:id',
  helpers.isAuthenticated,
  NotificationControllers.deleteNotification
);

export default router;
