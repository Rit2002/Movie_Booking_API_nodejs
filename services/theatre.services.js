const Theatre = require('../models/theatre.model.js');

const createTheatre = async (data) => {
    try {
      const response = await Theatre.create(data);
      return response;

    } catch (error) {

      if(error.name == 'ValidationError'){
        let err = {};
        Object.keys(error.errors).forEach((key) => {
          err[key] = error.errors[key].message;
        })

        return { err : err, code : 422};
      }
    }
}

const getTheatre = async (id) => {
  try{
      const response = await Theatre.findById(id);
    if(!response){
      return { err : 'No theatre found for given id', code : 404 }
    }
    return response;

  }catch(error){
    console.log(error);
    throw error;
  }
}

module.exports = {
    createTheatre,
    getTheatre
}