const { checkSchema } = require('express-validator');

const postQuerySchema = checkSchema({
    limit: {
        optional: true,
        isInt: {
            options: { min: 10 },
            errorMessage: 'Limit must be at least 10',
        },
        toInt: true,
    },
});

const postParamSchema = checkSchema({
    id: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'Invalid Post ID',
        },
    },
});

const postCreateSchema = checkSchema({
    title: {
        notEmpty: {
            errorMessage: 'Title is required'
        },
        trim: true
    },
    description: {
        notEmpty: {
            errorMessage: 'Description is required'
        },
        trim: true
    }
});

const postUpdateSchema = checkSchema({
    title: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Title cannot be empty'
        }
    },
    description: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Description cannot be empty'
        }
    }
});

module.exports = {
    postCreateSchema,
    postUpdateSchema,
    postQuerySchema,
    postParamSchema
};
