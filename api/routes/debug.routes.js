const express = require('express');
const router = express.Router();
const debugController = require('../controllers/debug.controller');

// POST easily create a question. 
router.post('/question', debugController.postQuestion);

module.exports = router;