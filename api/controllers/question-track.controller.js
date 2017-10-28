// Controller with methods relating to the question track.

class QuestionTrackController {
    constructor() {

    }

    // Returns all of the questions in the question track to the user. 
    getQuestions(request, response) {
        response.send('get questions');
    }

    // Submit an answer for the specified question. 
    answerQuestion(request, response) {
        response.send('answer question');
    }
}

module.exports = QuestionTrackController;