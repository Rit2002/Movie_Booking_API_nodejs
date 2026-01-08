const theatreController = require('../controllers/theatre.controller.js');
const theatreMiddleware = require('../middlewares/theatre.middleware.js');

const routes = (app) => {

    app.post(
        '/mba/api/v1/theatres',
        theatreMiddleware.validateTheatreCreateReq,
        theatreController.create
    )

    app.get(
        '/mba/api/v1/theatres/:id',
        theatreController.getTheatre
    )

    app.get(
        '/mba/api/v1/theatres',
        theatreController.getAllTheatres
    )
}

module.exports = routes;