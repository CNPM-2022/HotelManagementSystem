import express from 'express';
const router = express.Router();
import { getReports, createReportsModal } from '../controllers/ReportController.js';

router.get('/all', getReports);

router.get('/create', createReportsModal);

export default router;
