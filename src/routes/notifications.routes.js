import express from 'express';
const router = express.Router();
import Publication from '../models/publications.js';
import * as PublicationController from '../controllers/publications.controller.js';
import helpers from '../helpers/auth.js';

router.get(
  '/',
  helpers.isAuthenticated,
  PublicationController.getNotifications
);

router.post(
  '/',
  helpers.isAuthenticated,
  PublicationController.createNotification
);

router.put(
  '/:id',
  helpers.isAuthenticated,
  PublicationController.updateNotification
);

router.delete(
  '/:id',
  helpers.isAuthenticated,
  PublicationController.deleteNotification
);

export default router;
