const jwt = require('jsonwebtoken');

const { errorResponseBody } = require('../utils/responsebody.js');
const userService = require('../services/user.services.js');
const { USER_ROLE } = require('../utils/constants.js');
const { STATUS_CODES } = require('../utils/constants.js');

const validateSignupRequest =  (req, res, next) => {
    // validating name
    if(!req.body.name){
        errorResponseBody.err = 'Name NOT found in a request object';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // validating email
    if(!req.body.email){
        errorResponseBody.err = 'Email NOT found in a request object';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validating password
    if(!req.body.password){
        errorResponseBody.err = 'Password NOT found in a request object';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

const validateSignInRequest = (req, res, next) => {

    if(!req.body.email) {
        errorResponseBody.err = 'No email provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.password) {
        errorResponseBody.err = 'No password found';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if(!token) {
            errorResponseBody.err = 'No token provided';
            return res.status(STATUS_CODES.FORBIDDEN).json(errorResponseBody);
        }

        const response = jwt.verify(token, process.env.AUTH_KEY);

        if(!response) {
            errorResponseBody.err = 'Token Not verified';
            return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
        }

        const user = await userService.getUserById(response.id);
        req.user = user.id;
        next();

    } catch (error) {
        console.log(error);
        // This block will invoke if random/tampered jwt token is sent.
        if(error.name == 'JsonWebTokenError') {
            errorResponseBody.err = error.message;
            return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
        }

        if(error.code == STATUS.NOT_FOUND) {
            errorResponseBody.err = 'User doesn\'t exist';
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);        
    }
}

const validateResetPasswordRequest = (req, res, next) => {

    if(!req.body.oldPassword) {
        errorResponseBody.err = 'old password is not provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.newPassword) {
        errorResponseBody.err = 'new password is not provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

const isAdmin = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin) {
        errorResponseBody.err = 'User is NOT ADMIN';
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }

    next();
}

const isClient = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client) {
        errorResponseBody.err = 'User is NOT CLIENT';
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }

    next();
}

const isAdminOrClient = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(!(user.userRole != USER_ROLE.client || user.userRole != USER_ROLE.admin)) {
        errorResponseBody.err = 'User is niether an ADMIN nor a CLIENT';
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateSignupRequest,
    validateSignInRequest,
    isAuthenticated,
    validateResetPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient
}