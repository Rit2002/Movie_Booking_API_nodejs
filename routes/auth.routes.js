const authController = require('../controllers/auth.controller.js');

const routes = (app) => {

    app.post(
        '/mba/api/v1/auth/signup',
        authController.signUp
    )
}

module.exports = routes;