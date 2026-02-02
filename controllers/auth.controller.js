const jwt = require('jsonwebtoken');

const userService = require('../services/user.services.js');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody.js');
const { STATUS_CODES } = require('../utils/constants.js');

const signUp = async (req , res) => {
    try {
        const response = await userService.createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully registered a user';

        return res.status(STATUS_CODES.CREATED).json(successResponseBody);

    } catch (error) {

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;        
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const signIn = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        const isValidPassword = await user.isValidPassword(req.body.password);
        if(!isValidPassword){
            throw {
                err : "Invalid Password",
                code : STATUS_CODES.UNAUTHORISED
            }
        }

        const token = jwt.sign(
            { id : user.id, email : user.email }, 
            process.env.AUTH_KEY, 
            { expiresIn : '1h' }
        );

        successResponseBody.message = 'Successfully logged in';
        successResponseBody.data = {
            email : user.email,
            role : user.userRole,
            status : user.userStatus,
            token : token
        }

        return res.status(STATUS_CODES.OK).json(successResponseBody);

    } catch (error) {
        
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const resetPassword = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user);
        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);

        if(!isOldPasswordCorrect){
            throw { err : 'Invalid Old Password', code : STATUS_CODES.FORBIDDEN };
        }

        user.password = req.body.newPassword;
        await user.save();

        successResponseBody.data = user;
        successResponseBody.message = 'Successfully updated the password for given user';

        return res.status(STATUS_CODES.OK).json(successResponseBody);

    } catch (error) {
        console.log(error);

        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        
    }
}

module.exports = {
    signUp,
    signIn,
    resetPassword
}