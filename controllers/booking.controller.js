const { errorResponseBody, successResponseBody } = require('../utils/responsebody.js');
const { STATUS_CODES } = require('../utils/constants.js');
const bookingService = require('../services/booking.services.js');


const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking({...req.body, userId: req.user});

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created a booking';
        
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);

    } catch (error) {
        
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create
}