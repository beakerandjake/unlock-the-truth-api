const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question-track.controller');

// GET all questions
router.get('/', questionController.getQuestions);

// POST answer for question
router.post('/:questionId', questionController.answerQuestion);