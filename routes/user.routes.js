const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const userMiddleware = require('../middlewares/user.middleware.js');

const routes = (app) => {
    // This route is to update the userRole or userStatus by admin
    app.patch(
        '/mba/api/v1/user/:id',
        authMiddleware.isAuthenticated,
        userMiddleware.validateUpdateUserRequest,
        authMiddleware.isAdmin,
        userController.update
    )
}

module.exports = routes