import express from 'express';
const router = express.Router();
import * as PublicationController from '../controllers/publications.controller.js';
import isAuthenticated from '../helpers/auth.js';

router.get('/', isAuthenticated, PublicationController.getPublications);

export default router;
