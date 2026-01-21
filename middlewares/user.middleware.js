const { errorResponseBody } = require("../utils/responsebody");
const { STATUS_CODES } = require('../utils/constants.js');

// this middleware validates id userRole or userStatus, either of them are provided or not
const validateUpdateUserRequest = (req, res, next) => {

    // !(A || B) ---> (!A && !B) by De Morgan’s law
    if(!(req.body.userRole || req.body.uerStatus)) {
        errorResponseBody.err = 'Malformed request, please send atleast one parameter';
        res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}


module.exports = {
    validateUpdateUserRequest
}