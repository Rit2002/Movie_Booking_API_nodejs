const showController = require('../controllers/show.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const showMiddleware = require('../middlewares/show.middleware');

const routes = (app) => {

    app.post(
        '/mba/api/v1/shows',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        showMiddleware.validateShowCreateRequest,
        showController.create
    );

    app.get(
        '/mba/api/v1/shows',
        showController.getShows
    );

    app.delete(
        '/mba/api/v1/shows/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        showMiddleware.validateShowDeleteRequest,
        showController.destroy
    );

    app.patch(
        '/mba/api/v1/shows/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        showMiddleware.validateShowUpdateRequest,
        showController.update
    )
}

module.exports = routes;