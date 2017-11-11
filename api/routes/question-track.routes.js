const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question-track.controller');


// GET all questions
router.get('/', questionController.getQuestions);

// POST new question. 
router.post('/', questionController.createQuestion);

// POST answer for current question
router.post('/answer', questionController.answerCurrentQuestion);

module.exports = router;