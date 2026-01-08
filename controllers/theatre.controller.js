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
    const response = await theatreService.getAllTheatres();
    
    successResponseBody.data = response;
    successResponseBody.message = 'Successfully fetched all the theatres';

    return res.status(200).json(successResponseBody);

  } catch (error) {
    errorResponseBody.err = error;
    
    return res.status(500).json(errorResponseBody);
  }  
}

module.exports = {
  create,
  getTheatre,
  getAllTheatres
}