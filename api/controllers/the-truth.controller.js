const TheTruth = require('../models/the-truth');
const Question = require('../models/question');

exports.getTheTruth = function (request, response, next) {
    //Check if all questions unlocked
    Promise.all([
            // Get the count of all questions.
            Question.count(),
            // Get the count of all questions which have been unlocked. 
            Question.count({
                status: 'unlocked'
            })
        ])
        .then(ensureUserHasUnlockedAllQuestions)
        .then(unlockTheTruth)
        .then(returnTheTruth)
        .catch(handleFailure);

    // Explodes if the user has not met the requirements to unlock the truth. 
    function ensureUserHasUnlockedAllQuestions(result) {
        const totalQuestionCount = result[0];
        const unlockedQuestionCount = result[1];

        if (totalQuestionCount <= 0) {

            throw {
                status: 403,
                message: 'Cannot unlock the truth because there aren\'t any questions!'
            };
        }

        if (totalQuestionCount !== unlockedQuestionCount) {
            throw {
                status: 403,
                message: 'Cannot unlock the truth because the all the questions haven\'t been completed!'
            };
        }
    }

    // UNLOCK THE TRUTH.
    function unlockTheTruth() {
        return TheTruth.getTheTruth();
    }

    // Let the user finally see the truth! 
    function returnTheTruth(result) {
        response.json({
            unlocked: true,
            theTruth: result
        });
    }

    function handleFailure(error) {
        if (error && error.status === 403) {
            response.json({
                unlocked: false,
                message: error.message || 'The truth is not ready to be unlocked!'
            });
            return;
        }

        next(error);
    }
};