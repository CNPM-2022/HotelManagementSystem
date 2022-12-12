import express from 'express';
const router = express.Router();
import { getBills, getBillById, createBill, getBillsByUserId } from '../controllers/BillController.js';

router.get('/all', getBills);

router.get('/:id', getBillById);

router.get('/user/:id', getBillsByUserId);

router.post('/create', createBill);

export default router;
