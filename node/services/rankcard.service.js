const db = require('../_helpers/database');
const RankCard = db.RankCard;


module.exports = {
    getRanks
}


/**
 * TODOc: write the necessary functions that will address the needs of parecord.controller.
 Hint: look at the signatures in the module.exports.
 Hint2: look at user.service to see how you can interact with the database.
 Hint3: look at the class material.
 */
//
async function getRanks(){
    return RankCard.find().populate({ path: 'createdBy', select: 'username' });
}

