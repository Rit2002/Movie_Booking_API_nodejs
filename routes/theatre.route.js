const theatreController = require('../controllers/theatre.controller.js');
const theatreMiddleware = require('../middlewares/theatre.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const routes = (app) => {

    app.post(
        '/mba/api/v1/theatres',
        theatreMiddleware.validateTheatreCreateReq,
        theatreController.create
    )

    app.delete(
        '/mba/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        theatreController.destroy
    )

    app.get(
        '/mba/api/v1/theatres/:id',
        theatreController.getTheatre
    )

    app.get(
        '/mba/api/v1/theatres',
        theatreController.getAllTheatres
    )

    app.patch(
        '/mba/api/v1/:id/movies',
        theatreMiddleware.validateUpdateMovieRequest,
        theatreController.updateMovies
    )

    app.patch(
        '/mba/api/v1/theatres/:id',
        theatreController.update
    )

    app.put(
        '/mba/api/v1/theatres/:id',
        theatreController.update
    )

    app.get(
        '/mba/api/v1/theatres/:id/movies',
        theatreController.getMovies
    )

    app.get(
        '/mba/api/v1/theatres/:theatreId/movies/:movieId',
        theatreController.checkMovie
    )

}

module.exports = routes;