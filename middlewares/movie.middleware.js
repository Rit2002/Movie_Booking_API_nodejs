const { STATUS_CODES } = require('../utils/constants.js');

const badReqRes = {
  success : false,
  err : '',
  data : {},
  message : 'Bad Request'
}
/**
 * 
 * @param  req ---> HTTP request Object
 * @param  res ---> HTTP response Object
 * @param  next ---> next middleware function
 * @returns ---> returns whether the req is valid or not
 */
const validateMovieCreateReq =  (req, res, next) => {

    if(!req.body.name){
      badReqRes.err = 'The name NOT found';
      return res.status(STATUS_CODES.BAD_REQUEST).json(badReqRes);
    }

    if(!req.body.description){
      badReqRes.err = 'The description NOT found';
      return res.status(STATUS_CODES.BAD_REQUEST).json(badReqRes);
    }

    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
      badReqRes.err = 'The casts NOT found';
      return res.status(STATUS_CODES.BAD_REQUEST).json(badReqRes);
    }

    if(!res.body.trailerUrl){
      badReqRes.err = 'The trailerurl NOT found';
      return res.status(STATUS_CODES.BAD_REQUEST).json(badReqRes);
    }

    if(!res.body.releaseDate){
      badReqRes.err = 'The releaseDate NOT found';
      return res.status(STATUS_CODES.BAD_REQUEST).json(badReqRes);
    }
    
    if(!res.body.director){
      badReqRes.err = 'The director NOT found';
      return res.status(STATUS_CODES.BAD_REQUEST).json(badReqRes);
    }

    next();
}

module.exports = {
  validateMovieCreateReq
}