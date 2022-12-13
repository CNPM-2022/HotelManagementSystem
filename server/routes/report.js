import express from 'express';
const router = express.Router();
import { getReports, createReportsModal, getReportByMonth } from '../controllers/ReportController.js';

router.get('/all', getReports);

router.get('/all/:month/:year', getReportByMonth);

router.get('/create/:month/:year', createReportsModal);

export default router;
