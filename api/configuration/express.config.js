const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('../configuration/db.config');

// Configure our express application

module.exports = function (app, passport) {
    // Add basic extensions to our app  
    app.use(helmet());
    app.use(cors({
        origin: ['http://localhost:8080'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
};