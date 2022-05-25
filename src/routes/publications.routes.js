import express from 'express';
const router = express.Router();
import Publication from '../models/publications.js';
import * as NotificationController from '../controllers/publications.controller.js';
import helpers from '../helpers/auth.js';

router.get('/', helpers.isAuthenticated, async (req, res) => {
  const notifications = await Publication.find();
  res.render('pages/publications', { notifications });
});

router.post(
  '/',
  helpers.isAuthenticated,
  NotificationController.createNotification
);

router.put(
  '/:id',
  helpers.isAuthenticated,
  NotificationController.updateNotification
);

router.delete(
  '/:id',
  helpers.isAuthenticated,
  NotificationController.deleteNotification
);

export default router;
