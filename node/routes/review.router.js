// TODO 1/2

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/addreview', reviewController.createReview);
router.get('/getreviews', reviewController.getReviews);
router.delete('/:date', reviewController.deleteReview);

module.exports = router;