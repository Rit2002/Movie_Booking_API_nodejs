const { errorResponseBody } = require('../utils/responsebody.js');

/**
 * 
 * @param  req ---> HTTP request Object
 * @param  res ---> HTTP response Object
 * @param  next ---> next middleware function
 * @returns ---> returns whether the req is valid or not
 */
const validateTheatreCreateReq = async (req, res, next) => {

    if(!req.body.name){
        errorResponseBody.message = 'The name NOT found';
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.pincode){
        errorResponseBody.message = 'The pincode NOT found';
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.city){
        errorResponseBody.message = 'The city NOT found';
        return res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateTheatreCreateReq
}