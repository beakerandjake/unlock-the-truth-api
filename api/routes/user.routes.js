const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const requireLogin = require('../middleware/require-login.middleware');

module.exports = function (passport) {

    // Login
    router.post('/login', passport.authenticate('local'), userController.login);

    // Logout
    router.post('/logout', requireLogin, userController.logout);

    // Create user (temp)
    router.post('/', userController.createUser);

    return router;
};