const Movie = require('../models/movies.model.js');

const getMovieById = async(id) => {
    const Movie = await movie.findById(id);
    
    if(!Movie){
      return {
        err : 'No movie found for corresponding id',
        code : 404
      }
    }

    return Movie;
}

const deleteMovie = async(id) => {
    const response = await movie.findByIdAndDelete(id);
    return response;
}

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
            return { err : err, code : 422 };
        }
        else{
            throw error;
        }
    }
}

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
            return { err : err, code : 422 };
        }
        else{
            throw error;
        }
    }

}

const fetchMovies = async (filter) => {
    let query = {};
    if(filter.name){
        query.name = filter.name;
    }

    const movies = await Movie.find(query);
    if(!movies){
        return {
            err : 'NOT able to find the queries movies',
            code : 404
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