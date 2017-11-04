const TestController = require('../controllers/test.controller');

module.exports = function (app) {
    const testController = new TestController();

    app.route('/test')
        .get(testController.test);
};