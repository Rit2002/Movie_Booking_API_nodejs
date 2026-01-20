const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { errorResponseBody } = require('../utils/responsebody.js');
const userService = require('../services/user.services.js');

const validateSignupRequest =  (req, res, next) => {
    // validating name
    if(!req.body.name){
        errorResponseBody.err = 'Name NOT found in a request object';
        return res.status(400).json(errorResponseBody);
    }

    // validating email
    if(!req.body.email){
        errorResponseBody.err = 'Email NOT found in a request object';
        return res.status(400).json(errorResponseBody);
    }
    
    // validating password
    if(!req.body.password){
        errorResponseBody.err = 'Password NOT found in a request object';
        return res.status(400).json(errorResponseBody);
    }

    next();
}

const validateSignInRequest = (req, res, next) => {

    if(!req.body.email) {
        errorResponseBody.err = 'No email provided';
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.password) {
        errorResponseBody.err = 'No password found';
        return res.status(400).json(errorResponseBody);
    }

    next();
}

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if(!token) {
            errorResponseBody.err = 'No token provided';
            return res.status(403).json(errorResponseBody);
        }

        const response = jwt.verify(token, process.env.AUTH_KEY);

        if(!response) {
            errorResponseBody.err = 'Token Not verified';
            return res.status(401).json(errorResponseBody);
        }

        const user = await userService.getUserById(response.id);
        req.user = user.id;
        next();

    } catch (error) {
        console.log(error);
        // This block will invoke if random/tampered jwt token is sent.
        if(error.name == 'JsonWebTokenError') {
            errorResponseBody.err = error.message;
            return res.status(401).json(errorResponseBody);
        }

        if(error.code == 404) {
            errorResponseBody.err = 'User doesn\'t exist';
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);        
    }
}

module.exports = {
    validateSignupRequest,
    validateSignInRequest,
    isAuthenticated
}