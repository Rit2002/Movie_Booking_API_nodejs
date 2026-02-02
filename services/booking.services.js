const Booking = require('../models/booking.model.js');
const Show = require('../models/show.model.js');
const { STATUS_CODES } = require('../utils/constants.js');

const createBooking = async (data) => {
    try {
        const show = await Show.findOne({
            movieId: data.movieId,
            theatreId: data.theatreId,
            timing: data.timing
        });
        console.log(show);
        
        data.totalCost = data.noOfSeats * show.price;

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

const updateBooking = async (data, bookingId) => {
    try {
        const response = await Booking.findByIdAndUpdate(bookingId, data, { new : true, runValidators : true});
        
        if(!response) {
            throw { err : 'No booking found for given id', code : STATUS_CODES.NOT_FOUND };
        }

        return response;

    } catch (error) {
        console.log(error);

        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw { err : err, code : STATUS_CODES.UNPROCESSABLE_ENTITY };
        }

        throw error;        
    }
}

const getBooking = async (data) => {
    try {
        const response = await Booking.find({userId : data.userId});
        return response;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

const getAllBookings = async () => {
    try {
        const response = await Booking.find({});
        return response;
    } catch (error) {
        throw error;
    }
}

const getBookingById = async (bookingId, userId) => {
    try {
        const response = await Booking.findById(bookingId);

        if(!response) {
            throw {
                err : 'No booking found for given id',
                code : STATUS_CODES.NOT_FOUND
            }
        }

        
        if(response.userId != userId ) {
            throw {
                err : 'Given user id is not authorised to access booking',
                code : STATUS_CODES.UNAUTHORISED
            }
        }

        return response;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createBooking,
    updateBooking,
    getBooking,
    getAllBookings,
    getBookingById
}