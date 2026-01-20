const movieService = require('../services/movie.services.js');
const { STATUS_CODES } = require('../utils/constants.js');
const {successResponseBody, errorResponseBody} = require('../utils/responsebody.js');


const createMovie = async (req, res) => {
    try{
        const response = await movieService.createMovie(req.body);
       
        successResponseBody.message = 'successfully created movie';
        successResponseBody.data = response;
        res.status(STATUS_CODES.CREATED).json(successResponseBody);

    }catch(error){
      console.log(err);

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
      errorResponseBody.err = error;
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);

    }
};

const deleteMovie = async (req, res) => {
    try{
        const response = await movieService.deleteMovie(req.params.id);

        successResponseBody.message = 'successfully deleted the movie';
        successResponseBody.data = response;

        res.status(STATUS_CODES.OK).json(successResponseBody);

    }catch(error){
      console.log(err);

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

      errorResponseBody.err = error;
       res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);

    }
};

const getMovie = async (req, res) => {
    try{
        const res = await movieService.getMovieById(req.params.id);

        successResponseBody.data = res;
        res.status(STATUS_CODES.OK).json(successResponseBody);

    }catch(error){
      console.log(err);

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

      errorResponseBody.err = error;
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);

    }
};

const updateMovie = async (req, res) => {

    try {
        const response = await movieService.updateMovie(req.params.id, req.body);

        successResponseBody.data = response;
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
        const response = await movieService.fetchMovies(req.query);
        
        successResponseBody.data = response;
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

module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies
}
