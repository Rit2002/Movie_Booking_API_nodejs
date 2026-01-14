const Theatre = require('../models/theatre.model.js');

/**
 * 
 * @param  data --> object containing details of the theatre to be created
 * @returns ---> returns the object details of new theatre created
 */
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

/**
 * 
 * @param  id --> it is the unique id with which we will fetch the perticular movie
 * @returns ---> returns the object containing details about perticular movie
 */
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

/**
 * 
 * @param  data ---> the data to be used to filter out theatre based on city/pincode
 * @returns ---> returns the object with the filtered content of the theatre
 */
const getAllTheatres = async (data) => {
  try{
    const response = await Theatre.find({});
    return response;

  }catch(error){
    console.log(error);
    throw error;
  }
}

/**
 * 
 * @param  id -->using id we can identify the theatre to be deleted
 * @returns ---> returns the details of the deleted theatre
 */
const deleteTheatre = async (id) => {
    try {
      const response = await Theatre.findByIdAndDelete(id);
      if(!response){
        return {
          err : 'No record of the theatre found for the given id',
          code : 404
        }
        return response;
      }
    } catch (error) {
      console.log(error);
      throw error;      
    }
}

/**
 * 
 * @param  id --> the unique id to identify the theatre to be updated 
 * @param data --> object to be used to update the theatre
 * @returns --> returns the new updated theatre object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  const theatre = await Theatre.findById(theatreId);
  if(!theatre) {
    return {
      err : 'No such theatre found for the id provided',
      code : 404
    }
  }
  if(insert){
    // Add movie if insert flag is true
    movieIds.forEach( movieId => {
      theatre.movies.push(movieId);
    });
  }
  else{
    // remove movie
    let savedMovieIds = theatre.movies;
    movieIds.forEach( movieId => {
      savedMovieIds = savedMovieIds.filter( smi => smi !== movieId);
    });

    theatre.movies = savedMovieIds;
  }
  // .save() --> Writes the current in-memory state of the document back to MongoDB
  await theatre.save();
  return theatre.populate('movies');
}

module.exports = {
    createTheatre,
    getTheatre,
    getAllTheatres,
    deleteTheatre,
    updateMoviesInTheatres
}