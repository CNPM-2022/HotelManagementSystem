const express = require('express');
const router = express.Router();
import {
    changeInfo,
    changePassword,
    getUsers,
    addUser,
    getUserById,
    deleteUser,
} from '../controllers/UserController.js';

router.put('/:id/change-info', changeInfo);
router.put('/:id/change-password', changePassword);
router.delete('/:id/delete', deleteUser);
router.get('/all', getUsers);
router.get('/:id', getUserById);
router.post('/add', addUser);

export default router;
