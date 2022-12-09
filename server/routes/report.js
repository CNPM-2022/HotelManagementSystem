import express from 'express';
const router = express.Router();
import { ReportByRoomType } from '../controllers/reportController.js';

router.get('/getbyroomtype', ReportByRoomType);

export default router;
