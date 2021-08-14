//TODO 1/2

const e = require("express");
const db = require("../_helpers/database");
const Review = db.Review;
const par = db.PArecord;

module.exports = {
    getAllReviews,
    addReview,
    deleteReview,
};

/**
 * TODOc: write the necessary functions that will address the needs of parecord.controller.
 Hint: look at the signatures in the module.exports.
 Hint2: look at user.service to see how you can interact with the database.
 Hint3: look at the class material.
 */

async function getAllReviews() {
    return Review.find().populate({ path: "createdBy", select: "username" });
}

async function deleteReview(username, date) {
    return Review.deleteOne({ createdDate: date, createdBy: username });
}

async function addReview(review, username) {
    console.log(review.createdDate);
    if (
        await Review.findOne({
            createdBy: username,
            description: review.description,
            location: review.location
        })
    ) {

        const query = {
            createdBy: username,
            description: review.description,
            location: review.location
        };

        newReview = review

        newReview.createdDate = new Date();

        await Review.findOneAndUpdate(query, newReview);
    } else {

        let newreview = review;
        newreview.createdBy = username;
        newreview.createdDate = new Date();

        dbrecord = new Review(newreview);

        // save the record
        await dbrecord.save();
    }

    if (!username) {
        throw "Error with the user submitting the request. User information missing. Malformed request.";
    }

}