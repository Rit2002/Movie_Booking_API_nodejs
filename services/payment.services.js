const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');

const { STATUS_CODES, BOOKING_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const createPayment = async (data) => {
    try {
       const booking = await Booking.findById(data.bookingId);
       if(!booking) {
            throw {
                err : 'No booking found for given id',
                code : STATUS_CODES.NOT_FOUND
            }
        }

        let bookingTime = booking.createdAt;
        let currentTime = Date.now();
        // Calculate how many minutes are remaining
        let minute = Math.floor(((currentTime - bookingTime) /1000) /60);

        if(minute > 10) {
            booking.status = BOOKING_STATUS.expired;
            await booking.save();
            return booking;
        }
        // creating the payment
        const payment = await Payment.create({
            bookingId : data.bookingId,
            amount : data.amount
        });
        
        if(payment.amount != booking.totalCost) {
            payment.status = PAYMENT_STATUS.failed;
        }
        
        // returning failed payment to controller
        if(payment.status == PAYMENT_STATUS.failed) {
            booking.status = BOOKING_STATUS.cancelled;
            await booking.save();
            await payment.save();
            return booking;
        }

        payment.status = PAYMENT_STATUS.success;
        booking.status = BOOKING_STATUS.successful;
        await booking.save();
        await payment.save();

        return booking;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getPaymentById = async (id) => {
    try {
        const response = await Payment.findById(id).populate('bookingId');
        if(!response) {
            throw {
                err : 'No payment found for given id',
                code : STATUS_CODES.NOT_FOUND
            }
        }

        return response;

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}



module.exports = {
    createPayment,
    getPaymentById
}