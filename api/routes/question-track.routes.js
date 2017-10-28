const QuestionController = require('../controllers/question-track.controller');

module.exports = function (app) {
    const questionController = new QuestionController();

    console.log(questionController.getQuestions);

    app.route('/questions')
        .get(questionController.getQuestions);

    app.route('/questions/:questionId')
        .post(questionController.answerQuestion);
};