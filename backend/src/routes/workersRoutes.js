import express from 'express';
import { getAllWorkers, createWorker } from '../controllers/workersController.js';

const router = express.Router();

router.get('/workers', getAllWorkers);
router.post('/workers', createWorker);

export default router;