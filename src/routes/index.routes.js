import express from 'express';
const router = express.Router();
import * as NotificationControllers from '../controllers/notifications.controller.js';
import helpers from '../helpers/auth.js';

router.get('/', (req, res) => {
  res.render('pages/index');
});

export default router;
