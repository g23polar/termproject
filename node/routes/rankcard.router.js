const express = require('express');
const router = express.Router();
const rankcardController = require('../controllers/rankcard.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


// TODO : get rankings
router.get('/getranks', rankcardController.getRanks);

module.exports = router;
