const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    stars: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;