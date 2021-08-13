// TODO 1/2
const reviewService = require('../services/review.service')
    // const notifService = require('../')
module.exports = {
    createReview,
    getReviews,
    deleteReview
};


function createReview(req, res, next) {
    const jwttemp = req.headers["authorization"].split(" ")[1];
    const user = decode(jwttemp)["sub"];
    reviewService.addReview(req.body, user)
        .then((mes) => res.json(mes))
        .catch(err => next(err));
}

function getReviews(req, res, next) {
    console.log('getting all records in controller');
    reviewService.getAllReviews(req.body)
        .then((mes) => res.json(mes))
        .catch(err => next(err));
}


function deleteReview(req, res, next) {
    const jwttemp = req.headers["authorization"].split(" ")[1];
    const user = decode(jwttemp)["sub"];
    // console.log('deleting record in controller: ', req.body);
    reviewService.deleteReview(user, req.params.date)
        .then((mes) => res.json(mes))
        .catch(err => next(err));

}

function decode(jwt) {
    const base64 = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const buff = new Buffer(base64, "base64");
    return JSON.parse(buff.toString("ascii"));
}