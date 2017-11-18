const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question-track.controller');
const requireLogin = require('../middleware/require-login.middleware');

// GET all questions
router.get('/', questionController.getQuestions);

// POST answer for current question
router.post('/answer', requireLogin, questionController.answerCurrentQuestion);

// POST DEBUG CREATE NEW QUESTION. 
router.post('/', questionController.createQuestion);

// GET DEBUG RESET. 
router.get('/reset', questionController.reset);

module.exports = router;