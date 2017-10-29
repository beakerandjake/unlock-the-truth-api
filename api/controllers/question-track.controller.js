const mockData = require('./mock-data.json');

// Controller with methods relating to the question track.

class QuestionTrackController {
    constructor() {

    }

    // Returns all of the questions in the question track to the user. 
    getQuestions(request, response) {
        response.json(mockData);
    }

    // Submit an answer for the specified question. 
    answerQuestion(request, response) {
        response.send('answer question');
    }
}

module.exports = QuestionTrackController;