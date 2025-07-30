const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: "Unknown"
    },
    likes: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: "motivational"
    },
    description: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('quote', quoteSchema);