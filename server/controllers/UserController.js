import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
const verifyToken = require('../middleware/auth');
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// @desc    Change information of user
// @route   PUT /api/user/change-info
// @access  Private

const changeInfo = asyncHandler(async (req, res) => {
    const { username, email, Name, CMND, address } = req.body;
    const id = req.params.id;

    if (!username && !email && !Name && !CMND && !address) {
        res.status(400);
        throw new Error('Please fill one of the fields');
    }

    try {
        const user = await User.findById(id);
        if (user) {
            user.username = username;
            user.email = email;
            user.Name = Name;
            user.CMND = CMND;
            user.address = address;
        }
        const updatedUser = await user.save();

        if (updatedUser) {
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                updatedUser,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @desc    Change password of user
// @route   PUT /api/user/change-password
// @access  Private

const changePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    const id = req.params.id;

    if (!password && !newPassword) {
        res.status(400);
        throw new Error('Please fill one of the fields');
    }
    try {
        const user = await User.findById(id);
        const isMatch = await argon2.verify(user.password, password);
        const newHashedPassword = await argon2.hash(newPassword);
        if (user) {
            if (isMatch) {
                user.password = newHashedPassword;
            } else {
                res.status(400);
                throw new Error('Password is incorrect');
            }
        }
        const updatedUser = await user.save();
        const accessToken = jwt.sign({ userId: updatedUser._id }, process.env.ACCESS_TOKEN_SECRET);
        if (updatedUser) {
            res.status(200).json({
                success: true,
                message: 'Password changed successfully',
                updatedUser,
                accessToken,
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { changeInfo, changePassword };
