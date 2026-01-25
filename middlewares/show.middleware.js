const { errorResponseBody } = require('../utils/responsebody');
const { STATUS_CODES } = require('../utils/constants');
const objectId = require('mongoose').Types.ObjectId;

const validateShowCreateRequest = (req, res, next) => {

    // validates theatre id
    if(!req.body.theatreId) {
        
        errorResponseBody.err = 'No theatre id found';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validates movie id
    if(!req.body.movieId) {

        errorResponseBody.err = 'No movie id found';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // validates timing
    if(!req.body.timing) {

        errorResponseBody.err = 'No timing found';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validates noOfSeats
    if(!req.body.noOfSeats) {

        errorResponseBody.err = 'No noOfSeats found';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validates price
    if(!req.body.price) {

        errorResponseBody.err = 'No price found';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // validates the theatre id format
    if(!objectId.isValid(req.body.theatreId)) {
        
        errorResponseBody.err = 'Invalid theatre id format';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validates the movie id format
    if(!objectId.isValid(req.body.movieId)) {
        
        errorResponseBody.err = 'Invalid movie id format';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // everything is okay than
    next();
}

const validateShowDeleteRequest = (req, res, next) => {
    // validates id of show to be deleted
    if(!req.params.id) {

        errorResponseBody.err = 'No shows id provided';
        
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validates id format of show to be deleted
    if(!objectId.isValid(req.params.id)) {

        errorResponseBody.err = 'No shows id provided';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

const validateShowUpdateRequest = (req, res, next) => {
    // validates id of show to be updated
    if(!req.params.id) {

        errorResponseBody.err = 'No shows id provided';
        
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validates id format of show to be update
    if(!objectId.isValid(req.params.id)) {

        errorResponseBody.err = 'No shows id provided';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(req.body && (req.body.theatreId || req.body.movieId)) {

        errorResponseBody.err = 'We cannot update theatre or movie for already added show';

        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateShowCreateRequest,
    validateShowDeleteRequest,
    validateShowUpdateRequest
}