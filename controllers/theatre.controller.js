const theatreService = require('../services/theatre.services.js');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody.js');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);

        if(response.err){
          errorResponseBody.err = response.err;
          errorResponseBody.message = 'Validation failed on few parameters';
          return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        return res.status(201).json(successResponseBody);

    } catch (error) {
      console.log(error);
      errorResponseBody.err = error;
      return res.status(500).json(errorResponseBody);      
    }

}

const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    if(response.err){
      errorResponseBody.err = err;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully fetched the theatre';

    return res.status(200).json(successResponseBody);

  } catch (error) {
    errorResponseBody.err = error;
    
    return res.status(500).json(errorResponseBody);
  }  
}

const getAllTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheatres(req.query);
    
    successResponseBody.data = response;
    successResponseBody.message = 'Successfully fetched all the theatres';

    return res.status(200).json(successResponseBody);

  } catch (error) {
    errorResponseBody.err = error;
    
    return res.status(500).json(errorResponseBody);
  }  
}

const destroy = async (req, res) => {
    try {
      const response = await theatreService.deleteTheatre(req.params.id);
      
      if(response.err){
        errorResponseBody.err = response.err;
        return res.status(response.code).json(errorResponseBody);
      }
      
      successResponseBody.data = response;
      successResponseBody.message = 'Successfully deleted the movie';

      return res.status(200).json(successResponseBody);

    } catch (error) {

      errorResponseBody.err = error;
      return res.status(500).json(errorResponseBody);
    }
}

const updateMovies = async (req, res) => {
  try {
    const response = await theatreService.updateMoviesInTheatres(
    req.params.id, 
    req.body.movieIds, 
    req.body.insert
    );

    if(response.err){
      errorResponseBody.err = response.err;

      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully updated movies in the theatre';

    return res.status(200).json(successResponseBody);

  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;

    return res.status(500).json(errorResponseBody);    
  }
}

const update = async (req, res) => {
  try {
    const response = await theatreService.updateTheatre(req.params.id, req.body);

    if(response.err){
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully updated the theatre details';

    return res.status(200).json(successResponseBody);

  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;

    return res.status(500).json(errorResponseBody);    
  }
}

const getMovies = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInATheatre(req.params.id);
  
    if(response.err){
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = 'successfully fetched all the movies in a theatre';

    return res.status(200).json(successResponseBody);

  } catch (error) {
    errorResponseBody.err = error;

    return res.status(500).json(errorResponseBody);
  }
}

module.exports = {
  create,
  getTheatre,
  getAllTheatres,
  destroy,
  updateMovies,
  update,
  getMovies
}