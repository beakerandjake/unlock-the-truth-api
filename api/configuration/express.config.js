const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
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

    // configure express to use session and save in our db. 
    app.use(session({
        name: 'utt.session',
        resave: false,
        saveUninitialized: true,
        secret: 'keyboard cat',
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions'
        })
    }));

    // configure express to use passport session
    app.use(passport.initialize());
    app.use(passport.session());
};