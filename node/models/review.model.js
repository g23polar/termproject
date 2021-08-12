// TODO 1/2

//THIS will be used once we connect MongoDB   console.log("UnauthorizedError req:",req.url);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document


//TODOc: notice that the goals are missing from this schema.
const schema = new Schema({

    description: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date }
});

schema.index({createdDate:1, createdBy:1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Review', schema);



