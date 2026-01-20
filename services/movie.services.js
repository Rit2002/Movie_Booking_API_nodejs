const Movie = require('../models/movies.model.js');
const { STATUS_CODES } = require('../utils/constants.js');

/**
 * 
 * @param  id --> id will be used to identify movie to be fetched
 * @returns --> object containing the details of movie fetched
 */
const getMovieById = async(id) => {
    const Movie = await Movie.findById(id);
    
    if(!Movie){
      throw {
        err : 'No movie found for corresponding id',
        code : STATUS_CODES.NOT_FOUND
      }
    }

    return Movie;
}

/**
 * 
 * @param  id --> id will be used to identify movie to be deleted
 * @returns --> object containing the details of movie deleted
 */
const deleteMovie = async(id) => {
    try {
        const response = await Movie.findByIdAndDelete(id);
        if(!response){
            throw {
                err : 'No movie found for given id',
                code : STATUS_CODES.NOT_FOUND
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
 * @param  data --> object containing details of new movie to be created 
 * @returns  --> returns the new movie object created 
 */
const createMovie = async(data) => {
    try {

        const movie = await Movie.create(data);
        return movie;

    } catch (error) {
      
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });

            console.log(err);
            throw { err : err, code : STATUS_CODES.UNPROCESSABLE_ENTITY };
        }
        else{
            throw error;
        }
    }
}

/**
 * 
 * @param  id --> id will be used to identify movie to be updated
 * @param data --> object that contains actual data which to be updated in db
 * @returns --> returns the new updated movie details
 */
const updateMovie = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, { new : true, runValidators : true});
        return movie;

    } catch (error) {

         if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });

            console.log(err);
            throw { err : err, code : STATUS_CODES.UNPROCESSABLE_ENTITY };
        }
        else{
            throw error;
        }
    }

}

/**
 * 
 * @param  filter --> helps us in filtering out the data based on conditionals
 * @returns --> returns the object containing all the movies fetched based on the filter
 */
const fetchMovies = async (filter) => {
    let query = {};
    if(filter.name){
        query.name = filter.name;
    }

    const movies = await Movie.find(query);
    if(!movies){
        throw {
            err : 'NOT able to find the queries movies',
            code : STATUS_CODES.NOT_FOUND
        }
    }

    return movies;
}

module.exports = {
  createMovie,
  deleteMovie,
  getMovieById,
  updateMovie,
  fetchMovies
}