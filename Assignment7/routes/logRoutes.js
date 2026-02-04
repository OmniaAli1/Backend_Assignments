import express from 'express';
import { insertLog, getAllLogs } from '../controllers/logController.js';

const router = express.Router();

router.post('/', insertLog);

router.get('/', getAllLogs);

export default router;