const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    description: {
        type: String
    },
    profile_pic: {
        type: String
    },
    creating_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', userSchema);