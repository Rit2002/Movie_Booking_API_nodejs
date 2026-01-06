const badReqRes = {
  success : false,
  err : '',
  data : {},
  message : 'Bad Request'
}

const validateMovieCreateReq = async (req, res, next) => {

    if(!req.body.name){
      badReqRes.err = 'The name NOT found';
      return res.status(400).json(badReqRes);
    }

    if(!req.body.description){
      badReqRes.err = 'The description NOT found';
      return res.status(400).json(badReqRes);
    }

    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
      badReqRes.err = 'The casts NOT found';
      return res.status(400).json(badReqRes);
    }

    if(!res.body.trailerUrl){
      badReqRes.err = 'The trailerurl NOT found';
      return res.status(400).json(badReqRes);
    }

    if(!res.body.releaseDate){
      badReqRes.err = 'The releaseDate NOT found';
      return res.status(400).json(badReqRes);
    }
    
    if(!res.body.director){
      badReqRes.err = 'The director NOT found';
      return res.status(400).json(badReqRes);
    }

    next();
}

module.exports = {
  validateMovieCreateReq
}