const Test = require('../models/test');

class TestController {
    test(request, response) {
        const newModel = new Test({
            first_name: 'John',
            last_name: 'Doe'
        });

        newModel.save(function (err) {
            if (err) {
                throw err;
            } else {
                response.json('Great Job');
            }
        });

    }
}

module.exports = TestController;