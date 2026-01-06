const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true,
      minLength : 2
    },
    description: {
      type: String,
      required: true,
      minLength : 5
    },
    casts: {
      type: [String],
      required: true
    },
    trailerUrl: {
      type: String
    },
    language: {
      type: [String],
      required: true,
      default: 'English'
    },
    releaseDate: {
      type: String,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    releaseStatus: {
      type: String,
      required: true,
      default: 'Released'
    }

},{timestamps:true});

const movie = mongoose.model('Movie', movieSchema);

module.exports = movie;