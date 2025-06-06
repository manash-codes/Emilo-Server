const { validationResult, matchedData } = require('express-validator');
const { VALIDATION_ERROR } = require('../config/httpCode');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(VALIDATION_ERROR).json({
            success: false,
            message: 'Validation Failed',
            errors: errors.array(),
        });
    }

    req.validated = {
        body: matchedData(req, { locations: ['body'] }),
        query: matchedData(req, { locations: ['query'] }),
        params: matchedData(req, { locations: ['params'] }),
    };
    next();
};

module.exports = validateRequest;
