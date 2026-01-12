const movieController = require('../controllers/movie.controller.js');
const movieMiddleware = require('../middlewares/movie.middleware.js');

const routes = (app) => {
    // Create
    app.post(
        '/mba/api/v1/movies',
        movieMiddleware.validateMovieCreateReq, 
        movieController.createMovie,
        
    );
    // Delete
    app.delete(
        '/mba/api/v1/movies/:id', 
        movieController.deleteMovie,
    );
    // Read
    app.get(
        '/mba/api/v1/movies/:id', 
        movieController.getMovie,
    );
    // Update
    app.put(
        '/mba/api/v1/movies/:id',
        movieController.updateMovie
    )
    // Update
    app.patch(
        '/mba/api/v1/movies/:id',
        movieController.updateMovie
    )
    // Read
    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    )
}

module.exports = routes;