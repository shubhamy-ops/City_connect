import express from 'express';
import { getStats } from '../controllers/statController.js';

const router = express.Router();

router.route('/').get(getStats);

export default router;
