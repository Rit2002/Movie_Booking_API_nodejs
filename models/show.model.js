const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    TheatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    timing: {
        type: Number,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    format: {
        type: String
    }
}, { timestamps: true });

const show = mongoose.model('Show', showSchema);

module.exports = showSchema;