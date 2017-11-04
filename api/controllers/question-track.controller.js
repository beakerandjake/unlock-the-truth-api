const mockData = require('./mock-data.json');

// Returns all of the questions in the question track to the user. 
exports.getQuestions = (request, response) => {
    response.json(mockData);
};

// Submit an answer for the specified question. 
exports.answerQuestion = (request, response) => {
    const currentQuestion = mockData.currentQuestion;

    console.log(request.body);

    const questionId = 123;

    // Make a dummy previous question object. 
    const previousQuestion = {
        id: questionId,
        title: 'A great previous question',
        body: 'Blah blah blah',
        answer: 'Bob',
        failedAttempts: 69,
        answeredBy: 'Jim',
        timeToAnswer: '6 hours',
        number: currentQuestion.number
    };

    let newQuestion = null;

    const locked = mockData.lockedQuestions[0];

    if (locked) {
        // Make a dummy new question object. 
        newQuestion = {
            id: locked.id,
            title: 'Sint dolor aliqua cillum voluptate culpa nostrud consectetur anim.',
            body: 'Who is cool?',
            type: 'text',
            number: locked.number
        };
    }

    response.json({
        correct: true,
        nextQuestion: newQuestion,
        previousQuestion: previousQuestion
    });
};