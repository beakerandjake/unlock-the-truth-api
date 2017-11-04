const QuestionController = require('../controllers/question-track.controller');

module.exports = function (app) {
    const questionController = new QuestionController();

    app.route('/questions')
        .get(questionController.getQuestions);

    app.route('/questions/:questionId')
        .post(questionController.answerQuestion);
};