const Theatre = require('../models/theatre.model.js');
const Movie = require('../models/movies.model.js');
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
    let query = {};
    let pagination = {};

    if(data && data.city){
      query.city = data.city;
    }

    if(data && data.pincode){
      query.pincode = data.pincode;
    }

    if(data && data.name){
      query.name = data.name;
    }

    if(data && data.movieId){
      query.movies = {$all: data.movieId};
    }

    if(data && data.limit){
      pagination.limit = data.limit;
    }

    if(data && data.skip){
      let perPage = (data.limit) ? data.limit : 3;

      pagination.skip = (data.skip * perPage);
    }

    const response = await Theatre.find(query, {}, pagination);
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
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;      
    }
}

/**
 * 
 * @param  theatreId --> uniquely identifies the theatre
 * @param  movieIds ---> array containing movie ids to be updated
 * @param insert --> boolean variable which tells whether to add the movies(if true) or remove the movies(if false)
 * @returns ---> returns the object containing movie details in a perticular theatre
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  try {
    let theatre;
    if(insert){
      theatre = await Theatre.findByIdAndUpdate(
        {_id: theatreId},
        {$addToSet: {movies: {$each: movieIds}}},
        {new: true}
      );
    }
    else{
      theatre = await Theatre.findByIdAndUpdate(
        {_id: theatreId},
        {$pull: {movies: {$in: movieIds}}},
        {new: true}
      );
    }

    return theatre.populate('movies');

  } catch (error) {
    console.log(error);
    
    if(error.name == 'TypeError'){
      return {
        code: 404,
        message: 'No theatre found for given error'
      }
    }

    throw error;
  }
}

/**
 * 
 * @param  id ---> theatre id to find theatre
 * @param  data ---> object containing data to be updated
 * @returns ---> returns the object containing details of updated theatre
 */
const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new : true,
      runValidators : true
    })

    if(!response){
      return {
        err : "No Theatre found for given id",
        code : 404
      }
    }

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
 * @param  id --> theatre id to find theatre
 * @returns  --> returns the object containing details of all the movies running in a specific theatres
 */
const getMoviesInATheatre = async (id) => {
  try {
    const theatre = await Theatre.findById(id, {name:1, movies:1, address:1}).populate('movies');
    if(!theatre){
      return {
        code : 404,
        err : 'No theatre found for corresponding id'
      }

    }
    
    return theatre;

  } catch (error) {
    console.log(error);
    
    throw error;
  }
}

/**
 * 
 * @param  theatreId --->  theatre id to find theatre
 * @param  movieId ---> movieId to find the movie
 * @returns ---> returns true if a movie is running and false if it is not, in a theatre
 */

const checkMovieInATheatre = async (theatreId, movieId) => {
  try {
    const response = await Theatre.findById(theatreId);

    if(!response){
      return {
        code : 404,
        err : 'No theatre found for given theatreId'
      }
    }

    return response.movies.indexOf(movieId) != -1;

  } catch (error) {
    console.log(error);
    
    throw error;
  }
  
}


module.exports = {
    createTheatre,
    getTheatre,
    getAllTheatres,
    deleteTheatre,
    updateMoviesInTheatres,
    updateTheatre,
    getMoviesInATheatre,
    checkMovieInATheatre
}