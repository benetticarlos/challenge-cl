import express from 'express';
const router = express.Router();
import * as PublicationController from '../controllers/publications.controller.js';
import helpers from '../helpers/auth.js';

router.get('/', helpers.isAuthenticated, PublicationController.getPublications);

router.post(
  '/',
  helpers.isAuthenticated,
  PublicationController.createPublication
);

export default router;
