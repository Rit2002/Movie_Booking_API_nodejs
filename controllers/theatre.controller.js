const theatreService = require('../services/theatre.services.js');
const { STATUS } = require('../utils/constants.js');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody.js');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);

        successResponseBody.data = response;
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);

    } catch (error) {

       if(error.err){
          errorResponseBody.err = error.err;
          errorResponseBody.message = 'Validation failed on few parameters';
          return res.status(error.code).json(errorResponseBody);
        }

      errorResponseBody.err = error;
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);      
    }

}

const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    
    successResponseBody.data = response;
    successResponseBody.message = 'Successfully fetched the theatre';

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

const getAllTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheatres(req.query);
    
    successResponseBody.data = response;
    successResponseBody.message = 'Successfully fetched all the theatres';

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

const destroy = async (req, res) => {
    try {
      const response = await theatreService.deleteTheatre(req.params.id);
            
      successResponseBody.data = response;
      successResponseBody.message = 'Successfully deleted the movie';

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

const updateMovies = async (req, res) => {
  try {
    const response = await theatreService.updateMoviesInTheatres(
    req.params.id, 
    req.body.movieIds, 
    req.body.insert
    );

    
    successResponseBody.data = response;
    successResponseBody.message = 'Successfully updated movies in the theatre';

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

const update = async (req, res) => {
  try {
    const response = await theatreService.updateTheatre(req.params.id, req.body);

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully updated the theatre details';

    return res.status(STATUS_CODES.OK).json(successResponseBody);

  } catch (error) {
    console.log(error);

    if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }

    errorResponseBody.err = error;
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);    
  }
}

const getMovies = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInATheatre(req.params.id);
  
    successResponseBody.data = response;
    successResponseBody.message = 'successfully fetched all the movies in a theatre';

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

const checkMovie = async (req, res) => {
  try {
    const response = await theatreService.checkMovieInATheatre(req.params.theatreId, req.params.movieId);
    // console.log(response);
  
    successResponseBody.success = response;
    successResponseBody.message = 'Successfully checked the movie is running in a theatre';

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

module.exports = {
  create,
  getTheatre,
  getAllTheatres,
  destroy,
  updateMovies,
  update,
  getMovies,
  checkMovie
}