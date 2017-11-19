const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const questionController = require('../controllers/question-track.controller');

// GET all questions
router.get('/', questionController.getQuestions);

// POST answer for current question
// Protected behind JWT middleware (user must provide valid jwt token to access route)
router.post('/answer', jwt({
    secret: process.env.JWT_SECRET
}), questionController.answerCurrentQuestion);

// POST DEBUG CREATE NEW QUESTION. 
router.post('/', questionController.createQuestion);

// GET DEBUG RESET. 
router.get('/reset', questionController.reset);

module.exports = router;