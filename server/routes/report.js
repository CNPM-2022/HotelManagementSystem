import express from 'express';
const router = express.Router();
import { getReports, createReportsModal } from '../controllers/ReportController.js';

router.get('/get-reports', getReports);

router.get('/create-reports-modal', createReportsModal);

export default router;
