const Question = require('../models/question');


// Create a new question and save it to the database. 
exports.postQuestion = (request, response) => {

    Question
        .find({})
        .sort({
            number: 'desc'
        })
        .then(result => {
            response.json(result);
        })
        .catch(error => {
            throw error;
        });

    // const toSave = new Question({
    //     number: 3, // TODO
    //     status: 'Locked',
    //     title: request.body.title,
    //     body: request.body.body,
    //     type: request.body.type || 'text',
    //     answer: request.body.answer
    // });

    // toSave.save(function (err, result) {
    //     console.log('result', result);

    //     if (err) {
    //         throw err;
    //     } else {
    //         response.json('Inserted question:', result._id);;
    //     }
    // });
};