const mongoose = require('mongoose');
const { PAYMENT_STATUS } = require('../utils/constants.js');

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking'
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: {
            values:[PAYMENT_STATUS.failed, PAYMENT_STATUS.pending, PAYMENT_STATUS.success],
            message: 'Invalid PAYMENT status'
        },
        default: PAYMENT_STATUS.pending
    }
}, { timestamps: true });

const payment = mongoose.model('Payment', paymentSchema);

module.exports = payment;