const bookingController = require('../controllers/booking.controller.js');
const bookingMiddleware = require('../middlewares/booking.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const routes = (app) => {

    app.post(
        '/mba/api/v1/booking',
        authMiddleware.isAuthenticated,
        bookingMiddleware.validateCreateBooking,
        bookingController.create
    );

    app.patch(
        '/mba/api/v1/booking/:id',
        authMiddleware.isAuthenticated,
        bookingMiddleware.canChangeStatus,
        bookingController.update
    );

    app.get(
        '/mba/api/v1/booking',
        authMiddleware.isAuthenticated,
        bookingController.getBooking
    );

    app.get(
        '/mba/api/v1/booking/all',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdmin,
        bookingController.getAllBookings
    );

    app.get(
        '/mba/api/v1/booking/:id',
        authMiddleware.isAuthenticated,
        bookingController.getBookingById
    );
}

module.exports = routes;