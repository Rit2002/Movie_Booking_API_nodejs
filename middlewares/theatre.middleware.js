const { json } = require('express');
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

/**
 * 
 * @param  req ---> HTTP request Object
 * @param  res ---> HTTP response Object
 * @param  next ---> next middleware function
 * @returns ---> returns whether the req is valid or not
 */
const validateUpdateMovieRequest = async (req, res, next) => {

    if(req.body.insert == undefined){
        errorResponseBody.message = 'No insert parameter found';
        return res.status(400).json(errorResponseBody);
    }

    if(!req.params.id){
        errorResponseBody.message = 'No Theatre id found';
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.movieIds){
        errorResponseBody.message = 'No movieIds parameter found';
        return res.status(400).json(errorResponseBody);
    }

    if(!(req.body.movieIds instanceof Array)){
        errorResponseBody.message = 'Expected Array of movies';
        return res.status(400).json(errorResponseBody);
    }

    if(req.body.movieIds.length == 0){
        errorResponseBody.message = 'No movies are present to be updated';
        return res.status(400).json(errorResponseBody);
    }

   next();
}


module.exports = {
    validateTheatreCreateReq,
    validateUpdateMovieRequest
}