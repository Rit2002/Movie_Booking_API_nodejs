const { json } = require('express');
const { errorResponseBody } = require('../utils/responsebody.js');
const { STATUS_CODES } = require('../utils/constants.js');

/**
 * 
 * @param  req ---> HTTP request Object
 * @param  res ---> HTTP response Object
 * @param  next ---> next middleware function
 * @returns ---> returns whether the req is valid or not
 */
const validateTheatreCreateReq = async (req, res, next) => {

    if(!req.body.name){
        errorResponseBody.err = 'The name NOT found';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.pincode){
        errorResponseBody.err = 'The pincode NOT found';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.city){
        errorResponseBody.err = 'The city NOT found';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

/**
 * 
 * @param  req ---> HTTP request Object
 * @param  res ---> HTTP response Object
 * @param  next ---> next middleware function
 * @returns ---> returns whether the req is valid or not
 */
const validateUpdateMovieRequest =  (req, res, next) => {

    if(req.body.insert == undefined){
        errorResponseBody.err = 'No insert parameter found';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.params.id){
        errorResponseBody.err = 'No Theatre id found';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.movieIds){
        errorResponseBody.err = 'No movieIds parameter found';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!(req.body.movieIds instanceof Array)){
        errorResponseBody.err = 'Expected Array of movies';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(req.body.movieIds.length == 0){
        errorResponseBody.err = 'No movies are present to be updated';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

   next();
}


module.exports = {
    validateTheatreCreateReq,
    validateUpdateMovieRequest
}