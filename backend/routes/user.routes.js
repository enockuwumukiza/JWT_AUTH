const express = require('express');
const { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const protect = require('../middleware/authMiddleware');
const authRouter = express.Router();

authRouter.post('/', registerUser);
authRouter.post('/auth', authUser);
authRouter.post('/logout', logoutUser);
authRouter.get('/profile',protect, getUserProfile);
authRouter.put('/profile',protect, updateUserProfile);

module.exports = authRouter;