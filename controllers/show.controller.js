const showService = require('../services/show.services');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { STATUS_CODES } = require('../utils/constants');

const create = async (req, res) => {
    try {
        const response = await showService.createShow(req.body);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created a show';

        return res.status(STATUS_CODES.CREATED).json(successResponseBody);

    } catch (error) {

        if(error.err) {
            errorResponseBody.err = error.err;

            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);        
    }
}

const getShows = async (req, res) => {
    try {
        const response = await showService.getShows(req.query);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully fetched the shows';

        return res.status(STATUS_CODES.OK).json(successResponseBody);

    } catch (error) {

        if(error.err) {
            errorResponseBody.err = error.err;

            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        
    }
}

const update = async (req, res) => {
    try {
        const response = await showService.updateShow(req.params.id, req.body);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated the show';

        return res.status(STATUS_CODES.OK).json(successResponseBody);

    } catch (error) {
        
        if(error.err) {
            errorResponseBody.err = error.err;

            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const destroy = async (req, res) => {
    try {
        const response = await showService.deleteShow(req.params.id);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully removed the show';

        return res.status(STATUS_CODES.OK).json(successResponseBody);

    } catch (error) {

        if(error.err) {
            errorResponseBody.err = error.err;

            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    getShows,
    update,
    destroy
}