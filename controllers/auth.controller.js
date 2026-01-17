const userService = require('../services/user.services.js');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody.js');

const signUp = async (req , res) => {
    try {
        const response = await userService.createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully registered a user';

        return res.status(201).json(successResponseBody);

    } catch (error) {
        errorResponseBody.err = error;
        
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    signUp
}