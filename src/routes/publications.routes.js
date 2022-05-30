import express from 'express';
const router = express.Router();
import * as PublicationController from '../controllers/publications.controller.js';
import isAuthenticated from '../helpers/auth.js';

router.get('/', isAuthenticated, PublicationController.getPublications);

router.post('/', isAuthenticated, PublicationController.createPublication);

export default router;
