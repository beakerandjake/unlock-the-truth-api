const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configure our express application

module.exports = function (app, passport) {
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());

    // Cookie/Session
}