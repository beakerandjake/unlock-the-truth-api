// 3rd party 
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('api-error-handler');
const notFoundErrorHandler = require('./api/middleware/not-found.middleware');

// API Routes. 
const questionTrackRoutes = require('./api/routes/question-track.routes');


// Create express app.
const app = express();
const port = process.env.PORT || 3000;

// Add helmet middleware. 
app.use(helmet());

// Add cors middleware. 
app.use(cors());

// Add JSON body parser middleware. 
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017', {
    useMongoClient: true
});
const db = mongoose.connection;
db.on('error', () => {
    console.error('Error connecting to database');
});
db.on('open', () => {
    console.log('connected');
});

// Add the routing for the question track. 
questionTrackRoutes(app);

// Add 404 error handler. 
app.use(notFound);

// Add error handler which returns JSON.
app.use(errorHandler());

// Start the server
app.listen(port, function () {
    console.log(`Listening on port ${port}.`);
});