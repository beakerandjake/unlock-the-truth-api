const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

// Configure our express application

module.exports = function (app) {
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.enable('trust proxy');    
};