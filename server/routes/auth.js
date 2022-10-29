const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
import LoginController from "../controllers/LoginController";
import RegisterController from "../controllers/RegisterController";

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", RegisterController);

// @route   POST api/auth/login
// @desc    login user
// @access  Public

router.post("/login", LoginController);

module.exports = router;
