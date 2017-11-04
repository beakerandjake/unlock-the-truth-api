const Question = require('../models/question');


// Create a new question and save it to the database. 
exports.postQuestion = (request, response) => {

    // Generate the new question based on the provided body. 
    const toSave = new Question({
        status: 'Locked',
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
        .then(result => {
            const nextQuestionNumber = !result ? 1 : result.number;
            toSave.number = nextQuestionNumber;
            return toSave.save();
        })
        .then(result => {
            response.json(result);
        })
        .catch(error => {
            throw error;
        });
};