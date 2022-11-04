const express = require('express');
const router = express.Router();
import { changeInfo, changePassword } from '../controllers/UserController.js';

router.put('/:id/change-info', changeInfo);

router.put('/:id/change-password', changePassword);

export default router;
