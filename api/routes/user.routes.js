const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const requireLogin = require('../middleware/require-login.middleware');

// Login
router.post('/login', userController.login);

// Create user (temp)
router.post('/', userController.createUser);

module.exports = router;