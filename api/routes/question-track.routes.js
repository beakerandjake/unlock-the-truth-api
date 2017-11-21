const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const questionController = require('../controllers/question-track.controller');
const RateLimit = require('express-rate-limit');

// GET all questions
router.get('/', questionController.getQuestions);

// Protect answer route from brute force
const rateLimiter = RateLimit({
    windowMs: 30 * 60 * 1000, // 15 minute window 
    delayMs: 0, // disable slowdown    
    max: 250, // start blocking after 250 requests 
    message: "Too many answer attempts, please try again in 30 minutes"
});

// POST answer for current question
// Protected behind JWT middleware (user must provide valid jwt token to access route)
// Also protected behind rate limiter
router.post('/answer', jwt({
    secret: process.env.JWT_SECRET
}), rateLimiter, questionController.answerCurrentQuestion);


if (process.env.NODE_ENV === 'development') {
    // POST DEBUG CREATE NEW QUESTION. 
    router.post('/', questionController.createQuestion);

    // GET DEBUG RESET. 
    router.get('/reset', questionController.reset);
}


module.exports = router;