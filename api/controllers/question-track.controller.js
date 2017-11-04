const Question = require('../models/question');
const mockData = require('./mock-data.json');
const _ = require('lodash');

// Returns all of the questions in the question track to the user. 
exports.getQuestions = (request, response) => {

    const lockedQuestions = Question
        .find({
            status: 'locked'
        }, 'title number')
        .exec()
        .then(result => {
            response.json(result);
        })
        .catch(error => {
            next(error);
        });


    // Get unlocked questions
    // Get current question
    // Get locked questions. 
    //response.json(mockData);
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
            return toSave.save();
        })
        .then(result => {
            response.json(result);
        })
        .catch(error => {
            next(error);
        });
};