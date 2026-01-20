const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_ROLE, USER_STATUS } = require('../utils/constants.js');

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
        lowercase: true,
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
        enum: {
            values: [USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client],
            message: 'Invalid user role given'
        },
        default: USER_ROLE.customer
    },
    userStatus: {
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.approved, USER_STATUS.pending, USER_STATUS.rejected],
            message: 'Invalid user status given'
        },
        default: USER_STATUS.approved
    }
}, { timestamps: true });

// Arrow function do not have it's own "this" so we use normal function
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.methods.isValidPassword = async function (plainPassword) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, this.password);
    return compare;
}

const user = mongoose.model('User', userSchema);

module.exports = user;