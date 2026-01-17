const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    userRole: {
        type: String,
        required: true,
        default: 'CUSTOMER'
    },
    userStatus: {
        type: String,
        required: true,
        default: 'APPROVED'
    }
}, { timestamps: true });

const user = mongoose.model('User', userSchema);

module.exports = user;