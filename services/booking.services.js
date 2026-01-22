const Booking = require('../models/booking.model.js');
const { STATUS_CODES } = require('../utils/constants.js');

const createBooking = async (data) => {
    try {
        const response = await Booking.create(data);
        return response;

    } catch (error) {
        console.log(error);

        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw { err : err, code : STATUS_CODES.UNPROCESSABLE_ENTITY};
        }

        throw error;        
    }
}

module.exports = {
    createBooking
}