import express from 'express';
const router = express.Router();
import { getQuiDinh, updateQuiDinh } from '../controllers/QuiDinhController.js';

router.get('/get', getQuiDinh);

router.put('/update', updateQuiDinh);

export default router;
