import express from 'express';
const router = express.Router();
import { ReportByRoomType,getRoomUsageDensityReport } from '../controllers/ReportController.js';

router.get('/getbyroomtype', ReportByRoomType);

router.get('/getroomusagedensity', getRoomUsageDensityReport);


export default router;
