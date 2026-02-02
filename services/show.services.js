const Show = require('../models/show.model');
const { STATUS_CODES } = require('../utils/constants');
const Theatre = require('../models/theatre.model');

const createShow = async (data) => {
    try {
        const theatre = await Theatre.findById(data.theatreId);
        if(!theatre) {
            throw {
                err : 'No theatre found',
                code : STATUS_CODES.NOT_FOUND
            }
        }

        if(theatre.movies.indexOf(data.movieId) == -1){
            throw {
                err : 'movie is not available in requested theatre',
                code : STATUS_CODES.NOT_FOUND
            }
        }

        const response = await Show.create(data);
        return response;

    } catch (error) {
        console.log(error);
        
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw {
                err : err,
                code : STATUS_CODES.UNPROCESSABLE_ENTITY
            }
        }

        throw error;
    }
}

const getShows = async (data) => {
    try {
        let filter = {};

        if(data.theatreId) {
            filter.theatreId = data.theatreId
        }

        if(data.movieId) {
            filter.movieId = data.movieId
        }

        const response = await Show.find(filter);

        if(!response) {
            throw {
                err : 'No shows found for given movie in a given theatre',
                code : STATUS_CODES.NOT_FOUND
            }
        }

        return response;

    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param  id ---> id of the show to be updated in the DB 
 * @param  data ---> fields to be updated in a document
 */
const updateShow = async (id, data) => {
    try {
        const response = await Show.findByIdAndUpdate(id, data, { new : true, runValidators : true});

        if(!response) {
            throw {
                err : 'No show found for given id',
                code : STATUS_CODES.NOT_FOUND
            }
        }

        return response;

    } catch (error) {

         if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw {
                err : err,
                code : STATUS_CODES.UNPROCESSABLE_ENTITY
            }
        }

        throw error;
    }
}

/**
 * 
 * @param  id -->  id of the show to be deleted in the DB 
 */
const deleteShow = async (id) => {
    try {
        const response = await Show.findByIdAndDelete(id);
        
        if(!response) {
            throw {
                err : 'No show found to be deleted for given id',
                code : STATUS_CODES.NOT_FOUND
            }
        }

        return response;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createShow,
    getShows,
    updateShow,
    deleteShow
}