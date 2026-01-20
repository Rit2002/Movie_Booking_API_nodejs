const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const routes = (app) => {

    app.post(
        '/mba/api/v1/auth/signup',
        authMiddleware.validateSignupRequest,
        authController.signUp
    )

    app.post(
        '/mba/api/v1/auth/signin',
        authMiddleware.validateSignInRequest,
        authController.signIn
    )

    app.patch(
        '/mba/api/v1/auth/reset',
        authMiddleware.isAuthenticated,
        authController.resetPassword
    )
}

module.exports = routes;