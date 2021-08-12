//THIS will be used once we connect MongoDB   console.log("UnauthorizedError req:",req.url);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document


//TODOc: notice that the goals are missing from this schema.
const schema = new Schema({
    calories: { type: Number, required: true },
    minutes: { type: Number, required: true },
    minutegoal: { type: Number, required: true },
    caloriegoal: { type: Number, required: true },
    activityType: { type: Number, required: true, default: 1 },
    username: { type: Schema.Types.ObjectId, ref: 'User' },
    rank:{type: Number, default: 0}
});

schema.index({user:1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('RankCard', schema);



