import express from 'express';
const router = express.Router();

import { getBills, getBillById, createBill } from '../controllers/BillController.js';

router.get('/all', getBills);
router.get('/:id', getBillById);
router.post('/create', createBill);

export default router;
