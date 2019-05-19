const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    tmdbId: {
        required: true,
        type: String
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("review", reviewSchema);