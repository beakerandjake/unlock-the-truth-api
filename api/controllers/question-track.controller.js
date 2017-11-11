const Question = require('../models/question');
const _ = require('lodash');

// Returns all of the questions in the question track to the user. 
exports.getQuestions = (request, response, next) => {    
    Promise.all([
            Question.getUnlockedQuestionsVm(),
            Question.getCurrentQuestionVm(),
            Question.getLockedQuestionsVm(),
        ])
        .then(result => {
            response.json({
                unlockedQuestions: result[0] || [],
                currentQuestion: result[1] || null,
                lockedQuestions: result[2] || []
            });
        })
        .catch(next);
};

// Submit an answer for the current question. 
exports.answerCurrentQuestion = (request, response, next) => {
    // Grab the params we need. 
    const userAnswer = request.body.answer;

    // Validate param. 
    if (!userAnswer || !_.isString(userAnswer)) {
        return next({
            status: 400,
            message: 'Answer was null or invalid type!'
        });
    }

    // Get current question. 
    Question.getCurrentQuestionAndAnswer()
        .then(ensureCurrentQuestionExists)
        .then(checkAnswer)
        .catch(next);

    // Throws bad request if current question does not exist. 
    function ensureCurrentQuestionExists(question) {
        if (!question) {
            // No current question? Bad request. 
            throw {
                status: 400,
                message: 'There is not a current question to answer!'
            };
        }

        return question;
    }

    // See if the users answer matches the DB answer and handle accordingly. 
    function checkAnswer(question) {
        const lhs = _.trim(userAnswer).toLowerCase();
        const rhs = _.trim(question.answer).toLowerCase();

        if (lhs !== rhs) {
            return handleWrongAnswer(question);
        }

        return handleCorrectAnswer(question);
    }

    // Handle when the user answers the question with a wrong answer. 
    function handleWrongAnswer(question) {
        // Increment failed attempts
        question.failedAttempts++;

        return question.save()
            .then(() => {
                // Inform the user they got it wrong. 
                response.send({
                    correct: false
                });
            })
            .catch(() => {
                throw {
                    status: 500,
                    message: 'Failed to handle wrong answer!'
                };
            });
    }

    // Handle when the user answers the question correctly.
    function handleCorrectAnswer(question) {
        // Update the question now that it is unlocked. 
        question.status = 'unlocked';
        question.timeAnswered = new Date().toISOString();

        return question.save()
            .then(unlockNextQuestion)
            .then(() => {
                // Get the next/previous question for the vm. 
                return Promise.all([
                    Question.getLastUnlockedQuestionVm(),
                    Question.getCurrentQuestionVm()
                ]);
            })
            .then(result => {
                // Let the user know they got it right, send them info about the previous question, as well as their next question. 
                response.json({
                    correct: true,
                    previousQuestion: result[0] || null,
                    nextQuestion: result[1] || null
                });
            })
            .catch(() => {
                throw {
                    status: 500,
                    message: 'Could handle the correct answer!'
                }
            });
    }

    // Set the next locked question as the current question. 
    function unlockNextQuestion() {
        return Question.findOne({
                status: 'locked'
            })
            .sort({
                number: 'asc'
            })
            .then(result => {
                // Bail if there isn't a next question. 
                if (!result) {
                    return;
                }

                // Set this question as the current question. 
                result.status = 'current';
                result.timeUnlocked = new Date().toISOString();

                return result.save();
            });
    }

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

// Delete all questions and add 11 placeholder ones. 
exports.reset = (request, response, next) => {
    const questions = [new Question({
        status: 'current',
        title: '1',
        body: '1',
        type: 'text',
        answer: '1',
        number: 1,
        timeUnlocked: new Date().toISOString()
    })];

    _.times(3, num => {
        const questionNum = num + 2;
        questions.push(new Question({
            status: 'locked',
            title: _.toString(questionNum),
            body: _.toString(questionNum),
            type: 'text',
            answer: _.toString(questionNum),
            number: questionNum
        }));
    });

    Question.remove({})
        .then(() => {
            const promises = [];

            _.map(questions, question => {
                return question.save();
            });

            return Promise.all(promises);
        })
        .then(() => {
            response.json('saved em');
        })
        .catch(error => {
            next(error);
        });
};