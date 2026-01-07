const theatreController = require('../controllers/theatre.controller.js');
const theatreMiddleware = require('../middlewares/theatre.middleware.js');

const routes = (app) => {

    app.post(
        '/mba/api/v1/theatres',
        theatreMiddleware.validateTheatreCreateReq,
        theatreController.create
    )
}

module.exports = routes;