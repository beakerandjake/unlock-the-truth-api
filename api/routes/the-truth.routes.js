const express = require('express');
const router = express.Router();
const theTruthController = require('../controllers/the-truth.controller');

// GET THE TRUTH!
router.get('/', theTruthController.getTheTruth);

module.exports = router;