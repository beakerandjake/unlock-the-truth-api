const Question = require('../models/question');
const mockData = require('./mock-data.json');
const _ = require('lodash');

// Returns all of the questions in the question track to the user. 
exports.getQuestions = (request, response, next) => {

    Promise.all([
            Question.unlockedQuestions(),
            Question.currentQuestion(),
            Question.lockedQuestions(),
        ])
        .then(result => {
            response.json({
                unlockedQuestions: result[0] || [],
                currentQuestion: result[1] || {},
                lockedQuestions: result[2] || []
            });
        })
        .catch(error => {
            next(error);
        });
};

// Submit an answer for the specified question. 
exports.answerQuestion = (request, response) => {
    response.send('NOT IMPLEMENTED');
    // const currentQuestion = mockData.currentQuestion;

    // console.log(request.body);

    // const questionId = 123;

    // // Make a dummy previous question object. 
    // const previousQuestion = {
    //     id: questionId,
    //     title: 'A great previous question',
    //     body: 'Blah blah blah',
    //     answer: 'Bob',
    //     failedAttempts: 69,
    //     answeredBy: 'Jim',
    //     timeToAnswer: '6 hours',
    //     number: currentQuestion.number
    // };

    // let newQuestion = null;

    // const locked = mockData.lockedQuestions[0];

    // if (locked) {
    //     // Make a dummy new question object. 
    //     newQuestion = {
    //         id: locked.id,
    //         title: 'Sint dolor aliqua cillum voluptate culpa nostrud consectetur anim.',
    //         body: 'Who is cool?',
    //         type: 'text',
    //         number: locked.number
    //     };
    // }

    // response.json({
    //     correct: true,
    //     nextQuestion: newQuestion,
    //     previousQuestion: previousQuestion
    // });
};

// Create a new question and save it to the database. 
exports.createQuestion = (request, response, next) => {

    // Generate the new question based on the provided body. 
    const toSave = new Question({
        status: 'locked',
        title: request.body.title,
        body: request.body.body,
        type: request.body.type || 'text',
        answer: request.body.answer
    });

    // Get the highest question number from the database. 
    Question
        .findOne({}, 'number')
        .sort({
            number: 'desc'
        })
        .limit(1)
        // Now that we have highest number, save the new question to the database.
        .then(result => {
            const nextQuestionNumber = _.get(result, 'number', 0);
            toSave.number = nextQuestionNumber + 1;

            // Always make first question unlocked
            if (toSave.number === 1) {
                toSave.status = 'current';
                toSave.timeUnlocked = new Date().toISOString();
            }

            return toSave.save();
        })
        .then(result => {
            response.json(result);
        })
        .catch(error => {
            next(error);
        });
};