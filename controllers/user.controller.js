const userService = require('../services/user.services.js');
const { STATUS_CODES } = require('../utils/constants.js');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody.js');

const update = async (req, res) => {
    try {
        const response = await userService.updateUserRoleOrStatus(req.body, req.params.id);

        successResponseBody.data = response;
        successResponseBody.message = 'successfully updated the details of given user';
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
    update
}