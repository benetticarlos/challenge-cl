import express from 'express';
const router = express.Router();
import Publication from '../models/publications.js';
import * as NotificationController from '../controllers/publications.controller.js';
import helpers from '../helpers/auth.js';

router.get('/', helpers.isAuthenticated, async (req, res) => {
  const publications = await Publication.find();
  const user = req.user;
  console.log('user :>> ', user);
  const publicationsRev = publications.slice().reverse();
  res.render('pages/publications', { publications: publicationsRev });
});

router.post(
  '/',
  helpers.isAuthenticated,
  NotificationController.createNotification
);

// router.put(
//   '/:id',
//   helpers.isAuthenticated,
//   NotificationController.updateNotification
// );

// router.delete(
//   '/:id',
//   helpers.isAuthenticated,
//   NotificationController.deleteNotification
// );

export default router;
