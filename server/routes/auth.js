const express = require('express');
const router = express.Router();

import LoginController from '../controllers/LoginController';
import RegisterController from '../controllers/RegisterController';

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', RegisterController);

// @route   POST api/auth/login
// @desc    login user
// @access  Public

router.post('/login', LoginController);

export default router;
