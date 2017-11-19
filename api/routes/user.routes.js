const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Login
router.post('/login', userController.login);

// Create user (temp)
router.post('/', userController.createUser);

module.exports = router;