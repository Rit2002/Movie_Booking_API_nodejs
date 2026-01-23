const { errorResponseBody } = require('../utils/responsebody.js');
const { STATUS_CODES, USER_ROLE, BOOKING_STATUS } = require('../utils/constants.js');
const objectId = require('mongoose').Types.ObjectId;
const theatreService = require('../services/theatre.services.js');
const userService = require('../services/user.services.js');

const validateCreateBooking = async (req, res, next) => {
    // validating theatre id presence
    if(!req.body.theatreId) {
        errorResponseBody.err = 'No theatreId provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // Validate correct theatre id format
    if(!objectId.isValid(req.body.theatreId)) {
        errorResponseBody.err = 'Invalid theatre id provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // check if the theatre is present in the DataBase
    const theatre = await theatreService.getTheatre(req.body.theatreId);

    if(!theatre) {
        errorResponseBody.err = 'No theatre found for given id';
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponseBody);
    }
    
    // validating movie presence
    if(!req.body.movieId) {
        errorResponseBody.err = 'No movie id provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // Validate correct movie id format
    if(!objectId.isValid(req.body.movieId)) {
        errorResponseBody.err = 'Invalid movie id provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // check if the movie is present in the theatre
    if(theatre.movies.indexOf(req.body.movieId) == -1) {
        errorResponseBody.err = 'Given movie is not available in the requested theatre';
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponseBody);
    }

    // validating the timing
    if(!req.body.timing) {
        errorResponseBody.err = 'No movie timing provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validating the no of seats presence
    if(!req.body.noOfSeats) {
        errorResponseBody.err = 'No seats provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // req object has cleared all the checks
    next();
}

const canChangeStatus = async (req, res, next) => {
    const user = await userService.getUserById(req.user);

    if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled) {
        errorResponseBody.err = 'You are UNAUTHOSIRED to change the status';
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateCreateBooking,
    canChangeStatus
}