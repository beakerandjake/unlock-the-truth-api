// 3rd party 
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('api-error-handler');
const notFoundErrorHandler = require('./api/middleware/not-found.middleware');
const envConfig = require('dotenv').config();

// API Routes. 
const questionTrackRoutes = require('./api/routes/question-track.routes');
const theTruthRoutes = require('./api/routes/the-truth.routes');
const userRoutes = require('./api/routes/user.routes');

const app = express();
const port = process.env.PORT || 3000;

// Add helmet middleware. 
app.use(helmet());

// Add cors middleware. 
app.use(cors());

// Add JSON body parser middleware. 
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ds243055.mlab.com:43055/unlock-the-truth', {
    useMongoClient: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
});

const db = mongoose.connection;

db.on('error', err => {
    console.error('Error connecting to database', err);
});
db.on('open', () => {
    console.log('connected');
});

// Add our routes
app.use('/questions', questionTrackRoutes);
app.use('/thetruth', theTruthRoutes);
app.use('/user', userRoutes);

// Add 404 error handler. 
app.use(notFoundErrorHandler);

// Add error handler which returns JSON.
app.use(errorHandler());

// Start the server
app.listen(port, function () {
    console.log(`Listening on port ${port}.`);
});