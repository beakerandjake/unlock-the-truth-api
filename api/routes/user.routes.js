const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Login
router.post('/login', userController.login);

if (process.env.NODE_ENV === 'development') {
    // Debug route to create a user
    router.post('/', userController.createUser);
}

module.exports = router;